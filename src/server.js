
import { env } from './config/env.js';
import { createApp } from './app.js';


export function startServer() {
    const app = createApp();

    app.listen(env.port, () => {
        console.log(`Servidor Express en http://localhost:${env.port}`);
    });
}
