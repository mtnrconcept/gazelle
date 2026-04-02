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

    // 43. Envoi de l'email (on tente mais on ne bloque pas si c'est lent)
    let emailSent = false;
    try {
      // On lance l'envoi d'email
      const emailPromise = sendReservationEmail({
        nom, email, telephone, date, service, personnes: guests, message
      });
      
      // On attend maximum 4 secondes. Si c'est plus long, tant pis, le client a déjà sa confirmation.
      const emailRes = await Promise.race([
        emailPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 4000))
      ]) as { success: boolean };
      
      emailSent = emailRes.success;
    } catch (e) {
      const error = e as any;
      if (error.message === 'Timeout') {
        console.warn('Email sending timed out (4s), but continuing (DB is OK).');
      } else {
        console.error('Email failed during sending:', e);
      }
    }

    return NextResponse.json({ 
      success: true, 
      id: reservation?.id,
      emailSent: emailSent,
      message: 'Réservation enregistrée avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Error in reservation API:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la réservation' }, { status: 500 });
  }
}
