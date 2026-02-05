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

}