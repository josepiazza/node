import { prisma } from '../src/config/prisma.js';


beforeAll(async () => {
    await prisma.$connect();
});

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
});

afterAll(async () => {
    await prisma.$disconnect();
});
