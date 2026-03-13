import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
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
