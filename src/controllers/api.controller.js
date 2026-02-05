export class ApiController {
    constructor(messageService) {
        this.messageService = messageService;
    }

    async sendPersonMessage(req, res) {
        const { cell, message } = req.body;
        this.messageService.sendPersonMessage({ cell, message });
        res.status(201).json({ message: 'Mensaje enviado ' + message });
    }

    async sendTemplateMessage(req, res) {
        const { cell, templateName, language } = req.body;
        const rta = await this.messageService.sendTemplateMessage({ cell, templateName, language });
        res.status(201).json(rta);
    }

    async wsWebhook(req, res) {
        const { entry } = req.body;
        let wa_id = entry[0].changes[0].value.contacts[0].wa_id;
        let message = entry[0].changes[0].value.messages[0].text.body;
        const rta = await this.messageService.processMessage(wa_id, message);
        res.status(200).json(rta);
    }
}