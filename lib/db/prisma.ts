import { PrismaClient } from "../../generated/client/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const databaseUrl = process.env.DATABASE_URL || "";

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ accelerateUrl: databaseUrl });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
