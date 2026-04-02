import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  // Configuration brute pour MariaDB (Hostinger)
  // On privilégie 127.0.0.1 au lieu d'un nom de domaine externe
  const config = {
    host: '127.0.0.1', 
    port: 3306,
    user: 'u211547797_raphael',
    password: 'amiMILKA1007&&', // Password brut pour éviter les erreurs de parsing
    database: 'u211547797_lagazelledor26',
    connectionLimit: 5,
    connectTimeout: 10000, 
    idleTimeout: 30000    
  };

  const adapter = new PrismaMariaDb(config);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
