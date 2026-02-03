import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const [, token] = header.split(' ');

    try {
        const payload = jwt.verify(token, env.jwtSecret);
        req.user = { id: payload.sub };
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
