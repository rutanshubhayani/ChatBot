import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { HistoryResponse, ErrorResponse, TypedResponse } from '@/types';

export const historyHandler = async (
    req: Request,
    res: TypedResponse<HistoryResponse | ErrorResponse>,
    prisma: PrismaClient
) => {
    try {
        const { sessionId } = req.query;

        if (!sessionId || typeof sessionId !== 'string') {
            return res.status(400).json({ error: 'Session ID required' });
        }

        const messages = await prisma.message.findMany({
            where: { conversationId: sessionId },
            orderBy: { createdAt: 'asc' },
        });

        res.json({ messages });
    } catch (error) {
        console.error('History Handler Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
