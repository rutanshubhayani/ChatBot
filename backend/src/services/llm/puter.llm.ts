import { LLMMessage, PuterConfig } from '@/types';
const { init } = require('@heyputer/puter.js/src/init.cjs');

export const callPuterAI = async (messages: LLMMessage[], config: PuterConfig): Promise<string> => {
    try {
        const puter = init(config.authToken);
        const response = await puter.ai.chat(messages, { model: config.model });
        if (typeof response === 'string') {
            return response;
        } else if (response && typeof response === 'object' && 'message' in response) {
            return (
                (response as any).message?.content ||
                (response as any).message ||
                JSON.stringify(response)
            );
        }
        return String(response);
    } catch (error: any) {
        throw error;
    }
};
