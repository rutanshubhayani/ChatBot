import { callGoogleAI } from './llm/googleai.llm';
import { callPuterAI } from './llm/puter.llm';
import { callOpenAI } from './llm/openai.llm';
import { aiConfig } from '@/config';
import { LLMMessage } from '@/types';

export const generateAIResponse = async (messages: LLMMessage[]): Promise<string> => {
    try {
        if (aiConfig.provider === 'google') {
            return await callGoogleAI(messages, aiConfig.google);
        } else if (aiConfig.provider === 'puter') {
            return await callPuterAI(messages, aiConfig.puter);
        } else {
            return await callOpenAI(messages, aiConfig.openai);
        }
    } catch (error) {
        console.error('AI Service Error:', error);
        return "I'm sorry, I'm having trouble processing your request right now. Please try again.";
    }
};
