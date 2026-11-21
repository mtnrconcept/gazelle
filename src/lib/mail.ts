import nodemailer from 'nodemailer';

type ReservationEmail = {
  nom: string;
  email: string;
  telephone?: string | null;
  date: string | Date;
  service: string;
  personnes: number;
  message?: string | null;
};

export async function sendReservationEmail(data: ReservationEmail): Promise<{ success: boolean }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT || 587);
  const recipients = (process.env.RESERVATION_NOTIFY_EMAILS || 'lagazelledorgeneva@gmail.com')
    .split(',').map((value) => value.trim()).filter(Boolean);

  if (!host || !user || !password ||
      !Number.isInteger(port) || port < 1 || port > 65535 || recipients.length === 0) {
    console.error('Reservation SMTP notification is not configured');
    return { success: false };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass: password },
    connectionTimeout: 7000,
    greetingTimeout: 7000,
    socketTimeout: 7000,
  });

  const date = new Date(data.date).toLocaleDateString('fr-CH', { timeZone: 'Europe/Zurich' });
  const text = [
    'Nouvelle demande de réservation - La Gazelle d\'Or',
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
    'Attention : demande en attente de confirmation par le restaurant.',
  ].join('\n');

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || user,
      to: recipients.join(', '),
      subject: 'Nouvelle demande de réservation - ' + data.nom + ' - ' + date,
      text,
    });

    const accepted = Array.isArray(info.accepted) &&
      info.accepted.some((address: string) => recipients.some(
        (recipient) => recipient.toLowerCase() === String(address).toLowerCase()
      ));

    if (!accepted) console.error('Reservation SMTP did not accept any recipient');
    return { success: Boolean(accepted) };
  } catch (error) {
    console.error('Reservation SMTP notification failed:', error instanceof Error ? error.name : 'unknown error');
    return { success: false };
  } finally {
    transporter.close();
  }
}
