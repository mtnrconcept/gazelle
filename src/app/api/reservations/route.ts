import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendReservationEmail } from '@/lib/mail';
import { validateReservationInput } from '@/lib/reservation-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store' };

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'online' }, { headers: noStore });
  } catch {
    return NextResponse.json(
      { status: 'degraded', message: 'Le formulaire fonctionne en mode e-mail uniquement.' },
      { headers: noStore },
    );
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Données JSON invalides' }, { status: 400, headers: noStore });
  }

  const validated = validateReservationInput(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400, headers: noStore });
  }
  const { nom, email, telephone, date, service, personnes, message } = validated.data;

  let reservationId: number | null = null;
  try {
    const reservation = await prisma.reservation.create({
      data: {
        nom,
        email,
        telephone,
        date: new Date(date + 'T00:00:00.000Z'),
        service,
        personnes,
        message,
        status: 'pending',
      },
      select: { id: true },
    });
    reservationId = reservation.id;
  } catch (error) {
    // The restaurant can still receive and process a request while its DB is offline.
    console.error('Reservation database unavailable; trying email-only delivery:', error instanceof Error ? error.name : 'unknown');
  }

  const emailSent = (await sendReservationEmail({
    nom, email, telephone, date, service, personnes, message,
    emailOnly: reservationId === null,
  })).success;

  if (reservationId === null && !emailSent) {
    return NextResponse.json(
      { error: 'Votre demande n’a pas pu être transmise. Veuillez appeler le restaurant au +41 22 340 33 50.' },
      { status: 503, headers: noStore },
    );
  }

  if (reservationId === null) {
    return NextResponse.json(
      {
        success: true,
        status: 'pending',
        deliveryMode: 'email_only',
        emailSent: true,
        message: 'Demande transmise au restaurant par e-mail, en attente de sa confirmation.',
      },
      { status: 202, headers: noStore },
    );
  }

  return NextResponse.json(
    {
      success: true,
      id: reservationId,
      status: 'pending',
      deliveryMode: 'database',
      emailSent,
      message: emailSent
        ? 'Demande enregistrée et transmise au restaurant, en attente de confirmation.'
        : 'Demande enregistrée, mais la notification par e-mail a échoué. Veuillez appeler le restaurant.',
    },
    { status: 201, headers: noStore },
  );
}
