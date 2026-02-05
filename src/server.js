
import { env } from './config/env.js';
import { createApp } from './app.js';
import { startAgendaCron } from './jobs/cron.js';


export function startServer() {
    const app = createApp();

    app.listen(env.port, () => {
        console.log(`Servidor Express en http://localhost:${env.port}`);
    });

    startAgendaCron();
}
