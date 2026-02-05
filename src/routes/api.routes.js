import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { ApiController } from '../controllers/api.controller.js';
import { MessageService } from '../services/message.service.js';

const router = Router();

const messageService = new MessageService();
const apiController = new ApiController(messageService);

router.post('/message', auth, apiController.sendPersonMessage.bind(apiController));
router.post('/webhook', auth, apiController.wsWebhook.bind(apiController));
router.post('/template', auth, apiController.sendTemplateMessage.bind(apiController));

export default router;
