import { prisma } from '../config/prisma.js';

export class AgendasRepository {
    async getAll() {
        const agendas = await prisma.agenda.findMany();
        return agendas;
    }

    async findActiveByDayAndTime({ dayOfWeek, hour, minute }) {
        return prisma.agenda.findMany({
            where: {
                active: true,
                dayOfWeek,
                hour,
                minute,
            },
            include: {
                persona: true,
            },
        });
    }

    async findByPersonId(personId) {
        return prisma.agenda.findMany({
            where: {
                personaId: personId,
            },
            orderBy: [
                { dayOfWeek: 'asc' },
                { hour: 'asc' },
                { minute: 'asc' },
            ],
        });
    }
}