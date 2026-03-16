import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const sections = await prisma.menuSection.findMany({
    where: { parentId: null },
    include: {
      items: { orderBy: { sortOrder: 'asc' } },
      subsections: {
        orderBy: { sortOrder: 'asc' },
        include: {
          items: { orderBy: { sortOrder: 'asc' } },
        },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });

  return NextResponse.json(sections);
}

export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const body = await req.json();
  const section = await prisma.menuSection.create({
    data: {
      title: body.title,
      notes: body.notes ?? null,
      sortOrder: body.sortOrder ?? 0,
      parentId: body.parentId ?? null,
    },
  });

  return NextResponse.json(section, { status: 201 });
}
