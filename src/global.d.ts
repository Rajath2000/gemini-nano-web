interface AI {
    assistant: {
        capabilities: () => Promise<any>;
        create: (capabilities: Record<string, any> | undefined) => Promise<any>
        prompt: (query: string) => Promise<any>;
    };
    summarizer: {
        capabilities: () => Promise<any>;
        create: (capabilities: Record<string, any> | undefined) => Promise<any>
        summarize: (query: string) => Promise<any>;
    };
}

interface Window {
    ai: AI;
}
