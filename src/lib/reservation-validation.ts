export type ReservationPayload = {
  nom: string;
  email: string;
  telephone: string;
  date: string;
  service: 'dejeuner' | 'diner';
  personnes: number;
  message: string | null;
};

export type ReservationValidation =
  | { ok: true; data: ReservationPayload }
  | { ok: false; error: string };

export function swissToday(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('fr-CH', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Zurich',
  }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? '';
  return part('year') + '-' + part('month') + '-' + part('day');
}

export function validateReservationInput(body: unknown, today: string = swissToday()): ReservationValidation {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Demande invalide' };
  }
  const b = body as Record<string, unknown>;
  if (typeof b.nom !== 'string' || b.nom.trim().length < 2 || b.nom.trim().length > 255) {
    return { ok: false, error: 'Nom invalide' };
  }
  if (typeof b.email !== 'string' || b.email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim())) {
    return { ok: false, error: 'Adresse e-mail invalide' };
  }
  if (typeof b.telephone !== 'string' || b.telephone.trim().length < 6 || b.telephone.trim().length > 50 ||
    !/^[+0-9 ()/.\-]+$/.test(b.telephone.trim())) {
    return { ok: false, error: 'Téléphone invalide' };
  }
  if (typeof b.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(b.date)) {
    return { ok: false, error: 'Date invalide' };
  }
  const parsedDate = new Date(b.date + 'T00:00:00Z');
  if (!Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== b.date) {
    return { ok: false, error: 'Date invalide' };
  }
  if (b.date < today) {
    return { ok: false, error: 'La date doit être aujourd’hui ou ultérieure' };
  }
  if (parsedDate.getUTCDay() === 0) {
    return { ok: false, error: 'Le restaurant est fermé le dimanche' };
  }
  if (b.service !== 'dejeuner' && b.service !== 'diner') {
    return { ok: false, error: 'Service invalide' };
  }
  const personnes = Number(b.personnes);
  if (!Number.isInteger(personnes) || personnes < 1 || personnes > 20) {
    return { ok: false, error: 'Nombre de personnes invalide (1 à 20)' };
  }
  if (b.message != null && typeof b.message !== 'string') {
    return { ok: false, error: 'Message invalide' };
  }
  const message = typeof b.message === 'string' ? b.message.trim() : '';
  if (message.length > 2000) {
    return { ok: false, error: 'Le message est trop long' };
  }
  return {
    ok: true,
    data: {
      nom: b.nom.trim(),
      email: b.email.trim(),
      telephone: b.telephone.trim(),
      date: b.date,
      service: b.service,
      personnes,
      message: message || null,
    },
  };
}
