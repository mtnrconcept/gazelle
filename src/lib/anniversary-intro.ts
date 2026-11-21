/**
 * Intro vidéo plein écran de l'anniversaire (menus des 26, 27 et 28 novembre 2026).
 * Affichée à l'ouverture du site jusqu'au dimanche 29 novembre 2026 inclus, heure de Genève.
 */

/** Premier instant où l'intro n'est plus affichée : lundi 30 novembre 2026, 00:00 à Genève (CET, UTC+1). */
export const ANNIVERSARY_INTRO_END = Date.parse('2026-11-30T00:00:00+01:00');

/** Une fois fermée, l'intro ne réapparaît pas pendant la même visite (onglet). */
export const ANNIVERSARY_INTRO_STORAGE_KEY = 'gazelle-intro-anniversaire-2026-fermee';

const BASE = '/videos/anniversaire-2026';

export const ANNIVERSARY_INTRO_MEDIA = {
  landscape: {
    av1: `${BASE}/intro-16x9-av1.mp4`,
    h264: `${BASE}/intro-16x9-h264.mp4`,
    poster: `${BASE}/poster-16x9.webp`,
  },
  portrait: {
    av1: `${BASE}/intro-9x16-av1.mp4`,
    h264: `${BASE}/intro-9x16-h264.mp4`,
    poster: `${BASE}/poster-9x16.webp`,
  },
  /** Affiche fixe montrée à la place de la vidéo quand le visiteur a demandé moins d'animations. */
  still: `${BASE}/affiche.webp`,
} as const;

/** Codecs annoncés au navigateur : AV1 10 bits (plus léger) puis H.264 (compatible partout). */
export const ANNIVERSARY_INTRO_TYPES = {
  av1: 'video/mp4; codecs="av01.0.08M.10"',
  h264: 'video/mp4; codecs="avc1.640028"',
} as const;

export type IntroOrientation = 'landscape' | 'portrait';
export type IntroFit = 'cover' | 'contain';

export function isAnniversaryIntroActive(now: number): boolean {
  return now < ANNIVERSARY_INTRO_END;
}

/**
 * Choisit la vidéo (16:9 ou 9:16) selon l'écran, puis la remplit (cover) seulement si
 * on perd au plus 10 % de l'image ; sinon on l'affiche entière (contain) pour ne
 * couper ni le logo, ni les prix, ni les numéros de téléphone.
 */
export function introLayoutFor(width: number, height: number): { orientation: IntroOrientation; fit: IntroFit } {
  const screen = width > 0 && height > 0 ? width / height : 16 / 9;
  const orientation: IntroOrientation = screen <= 1 ? 'portrait' : 'landscape';
  const video = orientation === 'portrait' ? 9 / 16 : 16 / 9;
  const keptByCover = Math.min(screen / video, video / screen);
  return { orientation, fit: keptByCover >= 0.9 ? 'cover' : 'contain' };
}
