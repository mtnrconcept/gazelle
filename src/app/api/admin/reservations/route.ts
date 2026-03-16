import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get('status');
  const dateFrom = url.searchParams.get('dateFrom');
  const dateTo = url.searchParams.get('dateTo');

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (dateFrom || dateTo) {
    where.date = {};
    if (dateFrom) (where.date as Record<string, unknown>).gte = new Date(dateFrom);
    if (dateTo) (where.date as Record<string, unknown>).lte = new Date(dateTo);
  }

  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(reservations);
}
