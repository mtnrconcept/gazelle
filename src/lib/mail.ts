type ReservationEmail = {
  nom: string;
  email: string;
  telephone?: string | null;
  date: string | Date;
  service: string;
  personnes: number;
  message?: string | null;
  emailOnly?: boolean;
};

const reservationRecipient = 'lagazelledorgeneva@gmail.com';

export async function sendReservationEmail(data: ReservationEmail): Promise<{ success: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Reservation mail provider is not configured');
    return { success: false };
  }

  const date = new Date(data.date).toLocaleDateString('fr-CH', { timeZone: 'Europe/Zurich' });
  const text = [
    "Nouvelle demande de réservation - La Gazelle d'Or",
    '',
    data.emailOnly
      ? 'ATTENTION : la base de données est indisponible. Cette demande a été transmise uniquement par e-mail. Contactez le client pour confirmer.'
      : 'Demande enregistrée dans le tableau de bord et en attente de confirmation.',
    '',
    'Nom : ' + data.nom,
    'Email : ' + data.email,
    'Téléphone : ' + (data.telephone || 'Non renseigné'),
    'Date : ' + date,
    'Service : ' + (data.service === 'dejeuner' ? 'Déjeuner' : 'Dîner'),
    'Nombre de personnes : ' + data.personnes,
    '',
    'Message : ' + (data.message || 'Aucun'),
    '',
    'La réservation doit être confirmée par le restaurant.',
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "La Gazelle d'Or <reservations@lagazelledor.ch>",
        to: [reservationRecipient],
        reply_to: data.email,
        subject: (data.emailOnly ? '[A TRAITER PAR EMAIL] ' : '') +
          'Nouvelle demande de réservation - ' + data.nom + ' - ' + date,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error('Reservation email provider rejected request (HTTP ' + response.status + ')');
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.error('Reservation email provider failure:', error instanceof Error ? error.name : 'unknown');
    return { success: false };
  }
}
