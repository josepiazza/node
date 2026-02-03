import express from 'express';
import userRoutes from './routes/user.routes.js';
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';

export function createApp() {
    const app = express();

    // Middleware global
    app.use(express.json());
    app.use(loggerMiddleware);

    // Rutas
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);

    // Middleware de error

    app.use(errorMiddleware);

    return app;
}
