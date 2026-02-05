import cron from 'node-cron';

export function startAgendaCron() {
    cron.schedule('* * * * *', async () => {
        try {
            const ahora = new Date();
            const hora = ahora.getHours();
            const minutos = ahora.getMinutes();
            console.log(`Corriendo cron de agenda ${hora}:${minutos}`);
        } catch (error) {
            console.error('Agenda cron error:', error);
        }
    });
}