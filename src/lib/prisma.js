import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.ts";

/**
 * Singleton do PrismaClient com driver adapter better-sqlite3 (Prisma 7).
 * DATABASE_URL deve estar definida no .env.local (ex: "file:./dev.db")
 */

const DB_URL = process.env.DATABASE_URL;

const globalForPrisma = globalThis;

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({ url: DB_URL });
  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

