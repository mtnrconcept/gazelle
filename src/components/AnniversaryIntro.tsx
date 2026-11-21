'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Play, X } from 'lucide-react';
import {
  ANNIVERSARY_INTRO_MEDIA,
  ANNIVERSARY_INTRO_STORAGE_KEY,
  ANNIVERSARY_INTRO_TYPES,
  introLayoutFor,
  isAnniversaryIntroActive,
} from '@/lib/anniversary-intro';
import styles from './AnniversaryIntro.module.css';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const subscribeNothing = () => () => {};

function subscribeResize(callback: () => void) {
  window.addEventListener('resize', callback);
  window.addEventListener('orientationchange', callback);
  return () => {
    window.removeEventListener('resize', callback);
    window.removeEventListener('orientationchange', callback);
  };
}

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function wasClosedThisVisit() {
  try {
    return window.sessionStorage.getItem(ANNIVERSARY_INTRO_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function rememberClosed() {
  try {
    window.sessionStorage.setItem(ANNIVERSARY_INTRO_STORAGE_KEY, '1');
  } catch {
    // Stockage indisponible (navigation privée stricte) : l'intro reste simplement fermée jusqu'au prochain chargement.
  }
}

function getEligible() {
  return isAnniversaryIntroActive(Date.now()) && !wasClosedThisVisit();
}

function getLayoutKey() {
  const { orientation, fit } = introLayoutFor(window.innerWidth, window.innerHeight);
  return `${orientation}:${fit}`;
}

export function AnniversaryIntro() {
  const pathname = usePathname();
  // Jamais rendue côté serveur : ni le HTML, ni le SEO, ni le LCP de la page ne changent.
  const eligible = useSyncExternalStore(subscribeNothing, getEligible, () => false);
  const [closed, setClosed] = useState(false);

  const close = useCallback(() => {
    rememberClosed();
    setClosed(true);
  }, []);

  if (!eligible || closed || pathname?.startsWith('/admin')) return null;

  return <IntroOverlay onClose={close} />;
}

function IntroOverlay({ onClose }: { onClose: () => void }) {
  const layoutKey = useSyncExternalStore(subscribeResize, getLayoutKey, () => 'landscape:contain');
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true,
  );
  const [orientation, fit] = layoutKey.split(':') as ['landscape' | 'portrait', 'cover' | 'contain'];
  const media = ANNIVERSARY_INTRO_MEDIA[orientation];

  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const resumeAt = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // Bloque le défilement de la page, place le focus sur « Fermer », Échap ferme.
  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  // Lecture continue : aucune pause possible. Si le navigateur met la vidéo en pause
  // (onglet masqué, économie d'énergie…), elle repart dès que la page est de nouveau visible.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    video.muted = true;
    video.defaultMuted = true;
    video.disableRemotePlayback = true;

    const resume = () => {
      if (document.visibilityState !== 'visible' || !video.paused) return;
      video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'NotAllowedError') setBlocked(true);
      });
    };

    video.addEventListener('pause', resume);
    document.addEventListener('visibilitychange', resume);
    resume();

    return () => {
      video.removeEventListener('pause', resume);
      document.removeEventListener('visibilitychange', resume);
    };
  }, [orientation, reducedMotion]);

  const startAfterTap = () => {
    videoRef.current?.play().then(() => setBlocked(false)).catch(() => {});
  };

  return (
    <div
      className={styles.overlay}
      data-anniv-intro=""
      role="dialog"
      aria-modal="true"
      aria-labelledby="anniv-intro-title"
      aria-describedby="anniv-intro-desc"
      onContextMenu={(event) => event.preventDefault()}
    >
      <h2 id="anniv-intro-title" className={styles.sr}>
        {"Invitation à l'anniversaire de La Gazelle d'Or"}
      </h2>
      <p id="anniv-intro-desc" className={styles.sr}>
        Les 26, 27 et 28 novembre 2026, menu La Gazelle Royale à −50 % : 32,50 CHF au lieu de 65 CHF
        pour deux personnes, version végane 25 CHF au lieu de 50 CHF. Services de 12 h à 15 h, de 18 h
        à 21 h et de 21 h 30 à 1 h. Réservations au 022 340 33 50, 022 303 16 25 ou 079 936 78 66.
      </p>

      {reducedMotion ? (
        <Image
          src={ANNIVERSARY_INTRO_MEDIA.still}
          alt=""
          fill
          sizes="100vw"
          className={styles.still}
        />
      ) : (
        <video
          key={orientation}
          ref={videoRef}
          className={styles.video}
          style={{ objectFit: fit }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          poster={blocked ? media.poster : undefined}
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={() => {
            setPlaying(true);
            setBlocked(false);
          }}
          onTimeUpdate={(event) => {
            resumeAt.current = event.currentTarget.currentTime;
          }}
          onLoadedMetadata={(event) => {
            // Changement d'orientation : la nouvelle vidéo reprend au même instant.
            const video = event.currentTarget;
            if (resumeAt.current > 0 && Number.isFinite(video.duration)) {
              video.currentTime = resumeAt.current % video.duration;
            }
          }}
        >
          <source src={media.av1} type={ANNIVERSARY_INTRO_TYPES.av1} />
          <source src={media.h264} type={ANNIVERSARY_INTRO_TYPES.h264} />
        </video>
      )}

      {!reducedMotion && !playing && !blocked && <span className={styles.spinner} aria-hidden="true" />}

      {blocked && (
        <button type="button" className={styles.play} onClick={startAfterTap}>
          <Play size={30} aria-hidden="true" />
          <span>Lancer la vidéo</span>
        </button>
      )}

      <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
        <X size={20} aria-hidden="true" />
        <span>Fermer</span>
      </button>
    </div>
  );
}
