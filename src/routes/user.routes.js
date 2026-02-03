import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { UsersService } from '../services/users.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { auth } from '../middlewares/auth.js';
import { createUserValidator } from '../validators/users.validator.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

const repository = new UsersRepository();
const service = new UsersService(repository);
const controller = new UsersController(service);

router.get('/', controller.list.bind(controller));

router.post(
    '/',
    createUserValidator,
    validateRequest,
    controller.create.bind(controller)
);

router.get('/me', auth, controller.me.bind(controller));

export default router;
