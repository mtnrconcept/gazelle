import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'fallback-secret-change-me');
const COOKIE_NAME = 'admin_session';

export async function createSession(userId: number): Promise<string> {
  return new SignJWT({ sub: String(userId) })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(JWT_SECRET);
}

export async function verifySession(): Promise<{ userId: number } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { userId: Number(payload.sub) };
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export { COOKIE_NAME };
