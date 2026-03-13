import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nom, email, telephone, date, service, personnes, message } = body;

  if (!nom || !email || !date || !service || !personnes) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
  }

  if (!['dejeuner', 'diner'].includes(service)) {
    return NextResponse.json({ error: 'Service invalide' }, { status: 400 });
  }

  const guests = Number(personnes);
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    return NextResponse.json({ error: 'Nombre de personnes invalide' }, { status: 400 });
  }

  const reservation = await prisma.reservation.create({
    data: {
      nom: String(nom).slice(0, 255),
      email: String(email).slice(0, 255),
      telephone: telephone ? String(telephone).slice(0, 50) : null,
      date: new Date(date),
      service,
      personnes: guests,
      message: message ? String(message).slice(0, 2000) : null,
    },
  });

  return NextResponse.json(reservation, { status: 201 });
}
