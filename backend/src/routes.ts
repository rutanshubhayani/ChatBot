import { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { chatHandler } from '@/functions/chat';
import { historyHandler } from '@/functions/history';
import {
    ChatRequest,
    ChatResponse,
    ErrorResponse,
    HistoryResponse,
    TypedRequest,
    TypedResponse,
} from '@/types';

export const setupRoutes = (app: Application, prisma: PrismaClient): void => {
    app.get('/', (req: Request, res: Response) => {
        res.send('Backend API');
    });

    app.post('/api/chat', (req: Request, res: Response) =>
        chatHandler(
            req as TypedRequest<ChatRequest>,
            res as TypedResponse<ChatResponse | ErrorResponse>,
            prisma
        )
    );

    app.get('/api/history', (req: Request, res: Response) =>
        historyHandler(req, res as TypedResponse<HistoryResponse | ErrorResponse>, prisma)
    );
};
