// Chat Component Types
export interface Message {
    id: string;
    sender: "user" | "ai";
    text: string;
    timestamp: string;
    isNew?: boolean;
    isCached?: boolean;
}

// API Types (for future backend integration)
export interface ChatRequest {
    message: string;
    sessionId?: string;
}

export interface ChatResponse {
    reply: string;
    sessionId: string;
    isCached?: boolean;
}

export interface HistoryResponse {
    messages: Message[];
}

export interface ErrorResponse {
    error: string;
}
