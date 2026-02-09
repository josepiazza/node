import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { MessageService } from '../../services/message.service.js';
import { WsInterface } from '../../interfaces/wsInterface.js';
import qrcode from 'qrcode';
import fs from 'fs';
import path from 'path';

export class BaileysClient extends WsInterface {
    static instance;

    constructor() {
        super();
        if (BaileysClient.instance) {
            return BaileysClient.instance;
        }

        this.sock = null;
        this.qr = null; // Store the latest QR code data
        this.isConnected = false;
        this.authPath = path.resolve('baileys_auth_info');

        // Ensure auth directory exists
        if (!fs.existsSync(this.authPath)) {
            fs.mkdirSync(this.authPath, { recursive: true });
        }

        this.initialize();
        BaileysClient.instance = this;
        this.messageService = new MessageService();
    }

    static getInstance() {
        if (!BaileysClient.instance) {
            BaileysClient.instance = new BaileysClient();
        }
        return BaileysClient.instance;
    }

    async initialize() {
        const { state, saveCreds } = await useMultiFileAuthState(this.authPath);

        this.sock = makeWASocket({
            printQRInTerminal: false, // User requested endpoint, not terminal
            auth: state,
        });

        this.sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                // Convert QR to Data URL for easy display in frontend/browser
                this.qr = await qrcode.toDataURL(qr);
            }

            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                this.isConnected = false;
                if (shouldReconnect) {
                    this.initialize();
                }
            } else if (connection === 'open') {
                console.log('Opened connection to WhatsApp');
                this.isConnected = true;
                this.qr = null; // Clear QR on success
            }
        });

        this.sock.ev.on('creds.update', saveCreds);

        this.sock.ev.on('messages.upsert', async (m) => {
            // console.log(JSON.stringify(m, undefined, 2)); // Uncomment to see full event data

            const msg = m.messages[0];
            if (!msg.key.fromMe && m.type === 'notify') {
                this.handleIncomingMessage(msg);
            }
        });
    }

    // This is where you process incoming messages
    async handleIncomingMessage(msg) {

        const remoteJid = msg.key.remoteJidAlt;
        // Extract number (remove @s.whatsapp.net and device info if present)
        const number = remoteJid.split('@')[0].split(':')[0];
        const textMessage = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
        // if (msg.message?.audioMessage) {
        //     console.log('Audio message received');
        //     const { downloadMediaMessage } = await import('@whiskeysockets/baileys');
        //     const buffer = await downloadMediaMessage(msg, 'buffer', {});
        //     const transcription = await this.messageService.transcribeAudio(buffer);
        //     if (transcription) {
        //         this.saveMessageLogByCelular({ celular: number, content: transcription, sender: 'USER' });
        //         await this.messageService.processMessage(number, transcription);
        //         return;
        //     }

        // }

        if (textMessage) {
            this.saveMessageLogByCelular({ celular: number, content: textMessage, sender: 'USER' });
            await this.messageService.processMessage(number, textMessage);
        }
    }

    async getQr() {
        if (this.isConnected) {
            return { connected: true, qr: null };
        }
        return { connected: false, qr: this.qr };
    }

    async sendMessage(to, message) {
        if (!this.isConnected) {
            throw new Error('WhatsApp client is not connected');
        }
        const id = `${to}@s.whatsapp.net`;
        this.saveMessageLogByCelular({ celular: to, content: message, sender: 'APP' });
        return await this.sock.sendMessage(id, { text: message });
    }

    async sendTermsButton(to, message) {
        if (!this.isConnected) {
            throw new Error('WhatsApp client is not connected');
        }
        const id = `${to}@s.whatsapp.net`;
        this.saveMessageLogByCelular({ celular: to, content: message, sender: 'APP' });
        return await this.sock.sendMessage(id, {
            text: message,
            footer: "© Baileys Pro",
            buttons: [
                {
                    buttonId: 'accept',
                    buttonText: { displayText: 'Acepto' },
                    type: 1
                }
            ],
            headerType: 1
        });
    }
}
