import axios from 'axios';
import { env } from '../../config/env.js';

export class WhatsAppClient {
    constructor() {
        this.http = axios.create({
            baseURL: 'https://graph.facebook.com/v23.0',
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${env.whatsappToken}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async sendTextMessage({ phoneNumberId, to, body }) {
        const response = await this.http.post(
            `/${phoneNumberId}/messages`,
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

    async sendTemplateMessage({ phoneNumberId, to, templateName, language }) {
        const response = await this.http.post(
            `/${phoneNumberId}/messages`,
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
