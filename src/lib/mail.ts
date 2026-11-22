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


function escapeEmailHtml(value: string): string {
  const replacements: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (char) => replacements[char]);
}

/**
 * Acknowledges receipt of the request, never an actual confirmed table.
 * A booking may also have been forwarded by email while the database is offline.
 */
export async function sendReservationReceipt(data: ReservationEmail): Promise<{ success: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Customer reservation receipt provider is not configured');
    return { success: false };
  }

  const date = new Date(data.date).toLocaleDateString('fr-CH', {
    timeZone: 'Europe/Zurich',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const service = data.service === 'dejeuner' ? 'Déjeuner' : 'Dîner';
  const guests = data.personnes + (data.personnes === 1 ? ' personne' : ' personnes');
  const subject = "Votre demande de réservation a bien été reçue - La Gazelle d'Or";

  const text = [
    'Bonjour ' + data.nom + ',',
    '',
    "Nous avons bien reçu votre demande de réservation à La Gazelle d'Or.",
    'Notre équipe vérifiera les disponibilités et vous contactera pour confirmer votre table.',
    '',
    'Votre demande :',
    'Date : ' + date,
    'Service : ' + service,
    'Nombre de personnes : ' + guests,
    '',
    'Important : ce message confirme la réception de votre demande, pas encore la disponibilité de la table.',
    '',
    'Une question ? Contactez-nous au +41 22 340 33 50.',
    "La Gazelle d'Or",
    'Rue de Lyon 55, 1203 Genève',
    'https://lagazelledor.ch',
  ].join('\n');

  const html = [
    '<!doctype html><html lang="fr"><head><meta charset="utf-8"></head>',
    '<body style="margin:0;padding:32px 12px;background:#f7f3ec;color:#302720;font-family:Arial,Helvetica,sans-serif">',
    '<table role="presentation" style="border-collapse:collapse;max-width:560px;width:100%;margin:auto;background:#fff;border-radius:12px;overflow:hidden">',
    '<tr><td style="background:#34261b;padding:28px 30px;text-align:center;color:#e9c98c;font-size:25px;letter-spacing:1px;font-weight:bold">LA GAZELLE D’OR</td></tr>',
    '<tr><td style="padding:32px 30px">',
    '<h1 style="margin:0 0 20px;font-size:23px;line-height:1.3;color:#34261b">Nous avons bien reçu votre demande</h1>',
    '<p style="font-size:16px;line-height:1.6">Bonjour ' + escapeEmailHtml(data.nom) + ',</p>',
    '<p style="font-size:16px;line-height:1.6">Merci d’avoir choisi La Gazelle d’Or. Notre équipe vérifiera les disponibilités et reviendra vers vous pour confirmer votre table.</p>',
    '<table role="presentation" style="border-collapse:collapse;width:100%;background:#fbf8f3;margin:24px 0">',
    '<tr><td style="padding:16px 20px;color:#6c5640;font-size:14px">Date</td><td style="padding:16px 20px;font-weight:bold;text-align:right">' + escapeEmailHtml(date) + '</td></tr>',
    '<tr><td style="padding:0 20px 16px;color:#6c5640;font-size:14px">Service</td><td style="padding:0 20px 16px;font-weight:bold;text-align:right">' + service + '</td></tr>',
    '<tr><td style="padding:0 20px 16px;color:#6c5640;font-size:14px">Personnes</td><td style="padding:0 20px 16px;font-weight:bold;text-align:right">' + guests + '</td></tr>',
    '</table>',
    '<p style="margin:0;padding:15px 18px;background:#fff7e4;border-left:3px solid #c69c56;font-size:14px;line-height:1.6"><strong>À noter :</strong> cet e-mail confirme uniquement la réception de votre demande. Votre table n’est pas encore confirmée.</p>',
    '<p style="margin:24px 0 0;font-size:14px;line-height:1.6">Une question ? Appelez-nous au <a style="color:#8b632f" href="tel:+41223403350">+41 22 340 33 50</a>.</p>',
    '</td></tr>',
    '<tr><td style="padding:22px 30px;background:#f2eadf;text-align:center;font-size:13px;line-height:1.6;color:#685440">',
    'La Gazelle d’Or · Rue de Lyon 55, 1203 Genève<br>',
    '<a href="https://lagazelledor.ch" style="color:#8b632f">lagazelledor.ch</a>',
    '</td></tr></table></body></html>',
  ].join('');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "La Gazelle d'Or <reservations@lagazelledor.ch>",
        to: [data.email],
        reply_to: reservationRecipient,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error('Customer reservation receipt rejected (HTTP ' + response.status + ')');
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.error('Customer reservation receipt failure:', error instanceof Error ? error.name : 'unknown');
    return { success: false };
  }
}
