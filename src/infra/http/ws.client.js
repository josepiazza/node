import axios from 'axios';
import { WsInterface } from '../../interfaces/wsInterface.js';
import { env } from '../../config/env.js';

export class WhatsAppClient extends WsInterface {
    static instance;

    constructor() {
        super();
        if (WhatsAppClient.instance) {
            return WhatsAppClient.instance;
        }
        this.phoneNumberId = env.whatsappPhoneNumberId
        this.http = axios.create({
            baseURL: 'https://graph.facebook.com/v23.0',
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${env.whatsappToken}`,
                'Content-Type': 'application/json',
            },
        });
    }

    getInstance() {
        if (!WhatsAppClient.instance) {
            WhatsAppClient.instance = new WhatsAppClient();
        }
        return WhatsAppClient.instance;
    }

    async sendMessage({ to, body }) {
        const response = await this.http.post(
            `/${this.phoneNumberId}/messages`,
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to,
                type: 'text',
                text: {
                    body,
                },
            }
        );

        return response.data;
    }

    async sendTemplateMessage({ to, templateName, language }) {
        const response = await this.http.post(
            `/${this.phoneNumberId}/messages`,
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to,
                type: 'template',
                template: {
                    name: templateName,
                    language: {
                        code: language,
                    },
                },
            }
        );

        return response.data;
    }
}
