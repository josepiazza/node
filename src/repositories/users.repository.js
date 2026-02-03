import { prisma } from '../config/prisma.js';

export class UsersRepository {
    async findAll() {
        return prisma.user.findMany({
            select: { id: true, name: true, email: true },
        });
    }

    async create({ name, email, password }) {
        return prisma.$transaction(async (tx) => {

            return tx.user.create({
                data: { name, email, password },
                select: { id: true, name: true, email: true },
            });

        });


    }

    async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }
}
