import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const body = await req.json();
  const item = await prisma.menuItem.create({
    data: {
      name: body.name,
      description: body.description ?? null,
      price: body.price ?? null,
      image: body.image ?? null,
      sortOrder: body.sortOrder ?? 0,
      sectionId: body.sectionId,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
