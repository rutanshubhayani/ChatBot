import { AIConfig, ServerConfig, AIProvider, RedisConfig } from '@/types';

export const aiConfig: AIConfig = {
    provider: (process.env.AI_PROVIDER || 'google') as AIProvider,
    google: {
        apiKey: process.env.GOOGLE_API_KEY!,
        model: process.env.GOOGLE_MODEL || 'gemini-2.0-flash',
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY!,
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    },
    puter: {
        authToken: process.env.PUTER_AUTH_TOKEN!,
        appUid: process.env.PUTER_APP_UID!,
        model: process.env.PUTER_MODEL || 'gpt-4o-mini',
    },
};

export const serverConfig: ServerConfig = {
    port: parseInt(process.env.PORT!),
    cors: {
        origin: process.env.CORS_ORIGINS!.split(','),
        credentials: true,
    },
};

export const redisConfig: RedisConfig = {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    ttl: parseInt(process.env.CACHE_TTL || '600'),
};
