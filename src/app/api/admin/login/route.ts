import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession, verifyPassword, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Identifiants requis' }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
  }

  const token = await createSession(user.id);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 8 * 60 * 60,
    path: '/',
  });

  return res;
}
