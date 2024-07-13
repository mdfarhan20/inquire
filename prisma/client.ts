import { PrismaClient } from "@prisma/client";

declare module globalThis {
    let prisma: typeof PrismaClient.prototype
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production")
    globalThis.prisma = prisma;

export default prisma;