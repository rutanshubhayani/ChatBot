import { PrismaClient } from '@prisma/client';
import { SYSTEM_PROMPT } from '@/config';
import {
    ChatRequest,
    ChatResponse,
    ErrorResponse,
    TypedRequest,
    TypedResponse,
    LLMMessage,
} from '@/types';
import { generateAIResponse } from '@/services/ai.service';
import { getCache, setCache } from '@/services/redis.service';

export const chatHandler = async (
    req: TypedRequest<ChatRequest>,
    res: TypedResponse<ChatResponse | ErrorResponse>,
    prisma: PrismaClient
) => {
    try {
        const { message, sessionId } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message required' });
        }

        const processedMessage = message.trim();
        if (!processedMessage) {
            return res.status(400).json({ error: 'Message cannot be empty' });
        }

        let conversationId = sessionId;
        if (!conversationId) {
            const newConversation = await prisma.conversation.create({ data: {} });
            conversationId = newConversation.id;
        }

        await prisma.message.create({
            data: { conversationId, sender: 'user', text: processedMessage },
        });

        const history = await prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'asc' },
            take: 10,
        });

        const messages: LLMMessage[] = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history.map(
                (msg): LLMMessage => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text,
                })
            ),
        ];

        // Check cache
        const cacheKey = `chat:${processedMessage.toLowerCase()}`;
        const cachedReply = await getCache(cacheKey);

        if (cachedReply) {
            await prisma.message.create({
                data: { conversationId, sender: 'ai', text: cachedReply },
            });

            await prisma.conversation.update({
                where: { id: conversationId },
                data: { updatedAt: new Date() },
            });

            return res.json({
                reply: cachedReply,
                sessionId: conversationId,
                isCached: true,
            });
        }

        const aiReply = await generateAIResponse(messages);

        // Cache the response
        await setCache(cacheKey, aiReply);

        await prisma.message.create({
            data: { conversationId, sender: 'ai', text: aiReply },
        });

        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() },
        });

        res.json({ reply: aiReply, sessionId: conversationId });
    } catch (error) {
        console.error('Chat Handler Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
