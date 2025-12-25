import express, { Application } from 'express';
import cors from 'cors';
import { serverConfig } from '@/config';

export const setupMiddleware = (app: Application): void => {
    app.use(cors(serverConfig.cors));
    app.use(express.json());
};
