import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
let localClient: PrismaClient | undefined;

function getDatabaseConfig() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error('DATABASE_URL is not configured');

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('DATABASE_URL is invalid');
  }

  if (url.protocol !== 'mysql:' && url.protocol !== 'mariadb:') {
    throw new Error('DATABASE_URL must use mysql:// or mariadb://');
  }

  const host = url.hostname;
  const port = url.port ? Number(url.port) : 3306;
  const user = decodeURIComponent(url.username);
  const password = decodeURIComponent(url.password);
  const database = decodeURIComponent(url.pathname.slice(1));
  if (!host || !user || !password || !database || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DATABASE_URL is incomplete');
  }

  if (process.env.VERCEL &&
      ['127.0.0.1', 'localhost', '[::1]', '::1'].includes(host.toLowerCase())) {
    throw new Error('DATABASE_URL must use a reachable remote host on Vercel');
  }

  return {
    host,
    port,
    user,
    password,
    database,
    connectionLimit: 3,
    connectTimeout: 5000,
    idleTimeout: 30,
    ...(process.env.DATABASE_SSL === 'true' ? { ssl: true } : {}),
  };
}

function getClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  if (!localClient) {
    localClient = new PrismaClient({ adapter: new PrismaMariaDb(getDatabaseConfig()) });
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = localClient;
  }
  return localClient;
}

// Lazy initialization allows Next.js to build without production credentials.
// Actual database operations fail explicitly until DATABASE_URL is configured.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, key) {
    const client = getClient();
    const value = Reflect.get(client, key, client);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
