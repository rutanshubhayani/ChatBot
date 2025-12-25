import { apiClient } from "config/axios";
import { ENDPOINTS } from "config/api";
import { ChatRequest, ChatResponse, HistoryResponse } from "types";

export const chatAPI = {
    // Send a chat message
    sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
        const response = await apiClient.post<ChatResponse>(ENDPOINTS.chat, data);
        return response.data;
    },

    // Get chat history
    getHistory: async (sessionId: string): Promise<HistoryResponse> => {
        const response = await apiClient.get<HistoryResponse>(
            `${ENDPOINTS.history}?sessionId=${sessionId}`,
        );
        return response.data;
    },
};
