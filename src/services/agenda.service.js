import { env } from '../config/env.js';
import { AgendasRepository } from '../repositories/agendas.repository.js';

export class AgendaService {
    constructor() {
        this.agendasRepository = new AgendasRepository();
    }

    async findAlertsToSend() {
        try {
            const ahora = new Date();
            const dayOfWeek = ahora.getDay();
            const hour = ahora.getHours();
            const minute = ahora.getMinutes();
            const agendas = await this.agendasRepository.findActiveByDayAndTime({ dayOfWeek, hour, minute });
            console.log(agendas);
        } catch (error) {
            console.error('Agenda service error:', error);
        }
    }
}