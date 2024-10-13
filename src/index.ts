import cookies from 'browser-cookies';
const cookiekey = "GeminiEnvReady";

interface CustomCapabilities {
    topK : Number,
    temperature : Number
}


class GeminiNano {
    private geminiSession: any | null = null; // Use a specific type instead of any if possible
    private customCapabilities: CustomCapabilities | undefined;

    constructor(customCapabilities?: CustomCapabilities) {
        this.customCapabilities = customCapabilities;
    }

    private async checkStatus(): Promise<boolean> {
        try {
            let capabilities = await window?.ai?.assistant?.capabilities();
            capabilities = capabilities ? capabilities : await window?.ai?.summarizer?.capabilities();
            return capabilities?.available?.toUpperCase() === "READILY";
        } catch (err) {
            console.error("Error checking AI capabilities:", err);
            return false;
        }
    }

    private getChromeVersion(): number {
        const raw = navigator?.userAgent?.match(/Chrom(e|ium)\/([0-9]+)\./);
        return raw ? parseInt(raw[2], 10) : 0;
    }

    private async checkEnv(): Promise<boolean> {
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

        cookies.set(cookiekey, "true")
        return true;
    }

    public async createSession(sessionType: "assistant" | "summarizer" = "assistant"): Promise<boolean> {
        try {
            let isEnvSupported : any = cookies.get(cookiekey);
            isEnvSupported = isEnvSupported ? true : await this.checkEnv();
            if (isEnvSupported) {
                switch (sessionType) {
                    case "assistant":
                        this.geminiSession = await window.ai.assistant.create(this.customCapabilities)
                        console.log(this.geminiSession);
                        break;
                    case "summarizer":
                        this.geminiSession = await window.ai.summarizer.create(this.customCapabilities);
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

    public closeSession(): void {
        if (this.geminiSession) {
            this.geminiSession.destroy();
            this.geminiSession = null;
            console.log("Session destroyed.");
        }
    }

    private async handlePrompt(query: string, sessionType: "assistant" | "summarizer"): Promise<{ response: any } | void> {
        if (!query) return;

        console.log("Q:", query);
        const isSessionCreated = await this.createSession(sessionType);
        if (isSessionCreated && this.geminiSession) {
            try {
                const result = sessionType === "summarizer"
                    ? await this.geminiSession.summarize(query)
                    : await this.geminiSession.prompt(query);

                console.log("R:", result);

                setTimeout(() => {
                    this.closeSession();
                }, 1000);

                return { response: result };
            } catch (err) {
                console.error(`Error during ${sessionType} operation:`, err);
            }
        }
    }

    public async prompt(query: string): Promise<{ response: any } | void> {
        return this.handlePrompt(query, "assistant");
    }

    public async summarizer(query: string): Promise<{ response: any } | void> {
        return this.handlePrompt(query, "summarizer");
    }
}

export default GeminiNano;
