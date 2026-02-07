import { prisma } from '../config/prisma.js';

export class PersonasRepository {

    async createPerson(cell, name) {
        const persona = await prisma.persona.create({
            data: {
                celular: cell,
                nombre: name ?? null,
            },
        });
        return persona;
    }

    async updateAceptoTyC(personaId, aceptoTyC) {
        const persona = await prisma.persona.update({
            where: {
                id: personaId,
            },
            data: {
                aceptoTyC,
            },
        });
        return persona;
    }

    async updateNombre(personaId, nombre) {
        const persona = await prisma.persona.update({
            where: {
                id: personaId,
            },
            data: {
                nombre,
            },
        });
        return persona;
    }

    async updateRegistrado(personaId, registrado) {
        const persona = await prisma.persona.update({
            where: {
                id: personaId,
            },
            data: {
                registrado,
            },
        });
        return persona;
    }

    async updateHorarioLaboral(personaId, horarioLaboral) {
        const persona = await prisma.persona.update({
            where: {
                id: personaId,
            },
            data: {
                horarioLaboral,
            },
        });
        return persona;
    }

    async deletePerson(personaId) {
        const persona = await prisma.persona.delete({
            where: {
                id: personaId,
            },
        });
        return persona;
    }

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

    async findByCellWithOutAceptoTyC(celular) {
        const persona = await prisma.persona.findFirst({
            where: {
                celular,
                aceptoTyC: false
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
