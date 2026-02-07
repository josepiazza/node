import { Router } from 'express';
import { BaileysClient } from '../infra/baileys/baileys.client.js';
import { BaileysController } from '../controllers/baileys.controller.js';

const router = Router();

// Instantiate the client (Singleton-like behavior due to module caching)
const baileysClient = new BaileysClient();
const baileysController = new BaileysController(baileysClient);

router.get('/qr', baileysController.getQr.bind(baileysController));
router.post('/send', baileysController.sendMessage.bind(baileysController));

export default router;
