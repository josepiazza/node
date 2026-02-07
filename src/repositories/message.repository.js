import { prisma } from "../config/prisma.js";
import { PersonasRepository } from "./personas.repository.js";

export class MessageRepository {
    constructor() {
        this.prisma = prisma;
        this.personasRepository = new PersonasRepository();
    }

    async create({ personaId, content, sender }) {
        return await this.prisma.messageLog.create({
            data: {
                personaId,
                content,
                sender,
            },
        });
    }

    async createMessageLogByCelular({ celular, content, sender }) {
        const persona = await this.personasRepository.findByCell(celular);
        if (persona) {
            return await this.create({ personaId: persona.id, content, sender });
        }
        return null;
    }

    async finLastMessageLogByPersonaId(personaId) {
        return await this.prisma.messageLog.findFirst({
            where: {
                personaId,
                sender: 'APP',
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}