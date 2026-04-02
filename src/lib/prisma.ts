import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const isProd = process.env.NODE_ENV === 'production';
  
  // Sur Hostinger (Production), on utilise les variables d'hPanel
  // Sinon on utilise les valeurs par défaut pour le développement local
  const config = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'gazelle_dor',
    connectionLimit: 5
  };

  // Si DATABASE_URL est présent (format Prisma classique), on essaie de l'extraire pour simplifier
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    try {
      const url = new URL(dbUrl.replace('mysql://', 'http://').replace('mariadb://', 'http://'));
      config.host = url.hostname;
      config.port = parseInt(url.port) || 3306;
      config.user = decodeURIComponent(url.username);
      config.password = decodeURIComponent(url.password);
      config.database = url.pathname.replace('/', '');
    } catch (e) {
      console.warn("Prisma: Impossible d'analyser DATABASE_URL, utilisation des autres variables.");
    }
  }
  
  const adapter = new PrismaMariaDb(config);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
