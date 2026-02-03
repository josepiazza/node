import { Router } from 'express';
import { AuthService } from '../services/auth.service.js';
import { UsersRepository } from '../repositories/users.repository.js';

const router = Router();

const usersRepository = new UsersRepository();
const authService = new AuthService(usersRepository);

router.post('/login', async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

export default router;
