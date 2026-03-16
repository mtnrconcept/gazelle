import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const section = await prisma.menuSection.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      notes: body.notes,
      sortOrder: body.sortOrder,
    },
  });

  return NextResponse.json(section);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { id } = await params;
  await prisma.menuSection.delete({ where: { id: Number(id) } });

  return NextResponse.json({ ok: true });
}
