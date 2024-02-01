import { PrismaClient } from '@prisma/client';

const prisma = globalThis.prisma || new PrismaClient();
export default prisma;
