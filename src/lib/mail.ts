import nodemailer from 'nodemailer';

const reservationEmailRecipients = [
  'lagazelledorgeneva@gmail.com',
  'reservation@lagazelledorgeneva.com',
  'rbarman@hotmail.ch',
];

const transporter = nodemailer.createTransport({
  host: 'smtp.titan.email',
  port: 587,
  secure: false, // Port 587 utilise STARTTLS (secure doit être false)
  auth: {
    user: 'reservation@lagazelledorgeneva.com',
    pass: 'amiMILKA1007&&', // Password brut
  },
  tls: {
    // Indispensable sur certains hébergements pour accepter les certificats du serveur
    rejectUnauthorized: false
  }
});

export async function sendReservationEmail(data: {
  nom: string;
  email: string;
  telephone?: string | null;
  date: string | Date;
  service: string;
  personnes: number;
  message?: string | null;
}) {
  const mailOptions = {
    from: `"Site Web La Gazelle d'Or" <reservation@lagazelledorgeneva.com>`,
    to: reservationEmailRecipients.join(', '),
    subject: `Nouvelle Réservation - ${data.nom} - ${new Date(data.date).toLocaleDateString()}`,
    text: `
      Nouvelle demande de réservation reçue :
      
      Nom : ${data.nom}
      Email : ${data.email}
      Téléphone : ${data.telephone || 'Non renseigné'}
      Date : ${new Date(data.date).toLocaleDateString()}
      Service : ${data.service === 'dejeuner' ? 'Déjeuner' : 'Dîner'}
      Nombre de personnes : ${data.personnes}
      
      Message :
      ${data.message || 'Pas de message particulier.'}
    `,
    html: `
      <div style="font-family: inherit; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <div style="background: #1a1a1a; padding: 20px; text-align: center;">
          <h1 style="color: #ba8c50; margin: 0; font-size: 24px;">Nouvelle Réservation</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6;">
          <p>Une nouvelle demande de réservation a été effectuée sur le site :</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Nom :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.nom}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Téléphone :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.telephone || 'Non renseigné'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Date :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${new Date(data.date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Service :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.service === 'dejeuner' ? 'Déjeuner' : 'Dîner'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Personnes :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.personnes}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 6px;">
            <strong style="display: block; margin-bottom: 10px;">Message :</strong>
            <p style="margin: 0; font-style: italic;">${data.message || 'Pas de message particulier.'}</p>
          </div>
        </div>
        <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          Ce message a été envoyé automatiquement depuis le site lagazelledorgeneva.com
        </div>
      </div>
    `,
  };

  try {
    // On envoie individuellement à chaque destinataire pour maximiser le taux de succès sur Gmail.
    const sendPromises = reservationEmailRecipients.map((toAddress) =>
      transporter.sendMail({ ...mailOptions, to: toAddress })
    );

    const results = await Promise.all(sendPromises);
    
    console.log('Emails sent successfully to all recipients:', results.map(r => r.messageId));
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
