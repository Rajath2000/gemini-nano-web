const cookieManager = require('./cookieHelper.js');
const cookiekey = "GeminiEnvReady";

class GeminiNano {
    constructor( cutomCapabilities = {} ) {
        this.geminiSession = null;
        this.cutomCapabilities = cutomCapabilities;
    }

    async checkStatus() {
        try {
            let capabilities = await window?.ai?.assistant?.capabilities();
            capabilities = capabilities ? capabilities : await window?.ai?.summarizer?.capabilities();
            return capabilities?.available?.toUpperCase() === "READILY";
        } catch (err) {
            console.error("Error checking AI capabilities:", err);
            return false;
        }
    }

    getChromeVersion() {
        const raw = navigator?.userAgent?.match(/Chrom(e|ium)\/([0-9]+)\./);
        return raw ? parseInt(raw[2], 10) : 0;
    }

    async checkEnv() {
        const version = this.getChromeVersion();
        if (version < 127 && !("ai" in window)) {
            throw new Error("Your browser is not supported. Please update to version 127 or greater.");
        }

        if (!("ai" in window)) {
            throw new Error("Prompt API is not available. Check your configuration in chrome://flags/#prompt-api-for-gemini-nano.");
        }

        const state = await this.checkStatus();
        if (!state) {
            throw new Error("Built-in AI is not ready. Check your configuration in chrome://flags/#optimization-guide-on-device-model.");
        }

        cookieManager.setCookie(cookiekey, true);
        return true;
    }

    async createSession(sessionType = "assistant") {
        try {
            let isEnvSupported = cookieManager.getCookie(cookiekey);
            isEnvSupported = isEnvSupported ? isEnvSupported : await this.checkEnv();
            if (isEnvSupported) {
                switch (sessionType) {
                    case "assistant":
                        this.geminiSession = await window.ai.assistant.create(this.cutomCapabilities);
                        console.log(this.geminiSession)
                        break;
                    case "summarizer":
                        this.geminiSession = await window.ai.summarizer.create(this.cutomCapabilities);
                        break;
                    default:
                        throw new Error("Invalid session type.");
                }

                if (this.geminiSession) {
                    console.log(`Session created: ${JSON.stringify(this.geminiSession)}`);
                    return true;
                }
            }
        } catch (err) {
            console.error(`Error creating ${sessionType} session:`, err);
            return false;
        }
        return false;
    }

    closeSession() {
        if (this.geminiSession) {
            this.geminiSession.destroy();
            this.geminiSession = null;
            console.log("Session destroyed.");
        }
    }

    async handlePrompt(query, sessionType) {
        if (!query) return;

        console.log("Q:", query);
        const isSessionCreated = await this.createSession(sessionType);
        if (isSessionCreated && this.geminiSession) {
            try {
                const result = sessionType === "summarizer"
                    ? await this.geminiSession.summarize(query)
                    : await this.geminiSession.prompt(query);

                console.log("R:", result);

                setTimeout(()=>{
                    this.closeSession();
                },1000);

                return { response: result };
            } catch (err) {
                console.error(`Error during ${sessionType} operation:`, err);
            }
        }
    }

    async prompt(query) {
        return this.handlePrompt(query, "assistant");
    }

    async summarizer(query) {
        return this.handlePrompt(query, "summarizer");
    }
}

module.exports = GeminiNano;