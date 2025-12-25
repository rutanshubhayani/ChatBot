import axios from 'axios';
import { LLMMessage, LLMConfig } from '@/types';

const GOOGLE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export const callGoogleAI = async (messages: LLMMessage[], config: LLMConfig): Promise<string> => {
    const systemMessage = messages.find((msg) => msg.role === 'system');
    const conversationMessages = messages.filter((msg) => msg.role !== 'system');

    const requestBody: any = {
        contents: conversationMessages.map((msg) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        })),
        generationConfig: { maxOutputTokens: 500 },
    };

    if (systemMessage) {
        requestBody.systemInstruction = {
            parts: [{ text: systemMessage.content }],
        };
    }

    const response = await axios.post(
        `${GOOGLE_API_URL}/${config.model}:generateContent?key=${config.apiKey}`,
        requestBody,
        {
            headers: { 'Content-Type': 'application/json' },
            timeout: 0,
        }
    );

    return (
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process your request."
    );
};
