import { prisma } from '../config/prisma.js';

export class PersonasRepository {
    async getAll() {
        const personas = await prisma.persona.findMany({
            select: {
                id: true,
                celular: true
            },
        });
        return personas;
    }

    async findByCell(celular) {
        const persona = await prisma.persona.findFirst({
            where: {
                celular
            }
        });
        return persona;
    }

    async deleteSchedule(personaId) {
        const persona = await prisma.schedule.deleteMany({
            where: {
                personaId,
            },
        });
        return persona;
    }

    async createSchedule(tx, personaId, { dayOfWeek, hour, minute }) {

        await tx.agenda.deleteMany({
            where: {
                personaId,
            },
        });

        await tx.agenda.create({
            data: {
                personaId,
                dayOfWeek,
                hour,
                minute,
            },
        });
    }

}
