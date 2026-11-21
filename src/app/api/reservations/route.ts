import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendReservationEmail } from '@/lib/mail';
import { validateReservationInput } from '@/lib/reservation-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'online' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json(
      { status: 'unavailable', error: 'Service de réservation temporairement indisponible' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Données JSON invalides' }, { status: 400 });
  }

  const validated = validateReservationInput(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }
  const { nom, email, telephone, date, service, personnes, message } = validated.data;

  let reservation: { id: number };
  try {
    reservation = await prisma.reservation.create({
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
  } catch (error) {
    console.error('Reservation could not be persisted:', error instanceof Error ? error.name : 'unknown error');
    return NextResponse.json(
      { error: 'Le service de réservation est momentanément indisponible. Veuillez appeler le restaurant.' },
      { status: 503 },
    );
  }

  // Never confirm a reservation merely because SMTP accepted a notification.
  // SMTP failure does not discard a successfully stored pending request.
  const notification = await sendReservationEmail({
    nom, email, telephone, date, service, personnes, message,
  });

  return NextResponse.json(
    {
      success: true,
      id: reservation.id,
      status: 'pending',
      emailSent: notification.success,
      message: notification.success
        ? 'Demande enregistrée, en attente de confirmation du restaurant.'
        : 'Demande enregistrée, mais la notification a échoué. Veuillez téléphoner au restaurant.',
    },
    { status: 201 },
  );
}
