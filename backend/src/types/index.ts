// API Request/Response Types
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

// Database Types - Using Prisma generated types
import { Conversation, Message, SenderType } from '@prisma/client';

export { Conversation, Message, SenderType };

// AI Configuration Types
export type AIProvider = 'google' | 'openai' | 'puter';

export interface GoogleConfig {
    apiKey: string;
    model: string;
}

export interface OpenAIConfig {
    apiKey: string;
    model: string;
}

export interface AIConfig {
    provider: AIProvider;
    google: GoogleConfig;
    openai: OpenAIConfig;
    puter: PuterConfig;
}

export interface PuterConfig {
    authToken: string;
    appUid: string;
    model: string;
}

export interface ServerConfig {
    port: number;
    cors: {
        origin: string | string[];
        credentials: boolean;
    };
}

export interface RedisConfig {
    url: string;
    ttl: number;
}

// LLM Types
export interface LLMMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface LLMConfig {
    apiKey: string;
    model: string;
}

// Express Types
export interface TypedRequest<T = any> extends Express.Request {
    body: T;
}

export interface TypedResponse<T = any> extends Express.Response {
    json(data: T): this;
    status(code: number): this;
}
