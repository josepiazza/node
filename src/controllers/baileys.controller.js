export class BaileysController {
    constructor(baileysClient) {
        this.baileysClient = baileysClient;
    }

    async getQr(req, res) {
        const { connected, qr } = await this.baileysClient.getQr();
        if (connected) {
            return res.status(200).json({ status: 'connected', message: 'Client is already connected' });
        }
        if (!qr) {
            return res.status(202).json({ status: 'initializing', message: 'QR code is generating, please reload in a moment' });
        }

        // Return HTML with image to make it easy to view
        const html = `
            <html>
                <body>
                    <h1>WhatsApp QR Code</h1>
                    <img src="${qr}" alt="QR Code" />
                    <p>Scan this with your WhatsApp App</p>
                    <script>
                        setTimeout(() => window.location.reload(), 5000);
                    </script>
                </body>
            </html>
        `;
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    }

    async sendMessage(req, res) {
        const { to, message } = req.body;
        if (!to || !message) {
            return res.status(400).json({ error: 'Missing "to" or "message" fields' });
        }

        try {
            await this.baileysClient.sendTextMessage(to, message);
            res.status(200).json({ success: true, message: 'Message sent' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
