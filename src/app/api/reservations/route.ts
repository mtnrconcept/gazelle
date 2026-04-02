import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendReservationEmail } from '@/lib/mail';

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

  try {
    let reservation = null;
    
    // Tentative d'enregistrement en base de données
    try {
      reservation = await prisma.reservation.create({
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
    } catch (dbError) {
      console.error('Database error (reservation):', dbError);
      // On continue pour envoyer l'email quand même
    }

    // Envoi de l'email (priorité haute pour ne pas perdre la demande)
    const emailRes = await sendReservationEmail({
      nom,
      email,
      telephone,
      date,
      service,
      personnes: guests,
      message
    });

    if (!emailRes.success && !reservation) {
      throw new Error('Tout a échoué : Base de données et Email');
    }

    return NextResponse.json({ 
      success: true, 
      id: reservation?.id,
      emailSent: emailRes.success,
      message: 'Réservation reçue'
    }, { status: 201 });

  } catch (error) {
    console.error('Error in reservation API:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la réservation' }, { status: 500 });
  }
}
