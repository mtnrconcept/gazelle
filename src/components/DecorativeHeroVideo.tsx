'use client';

import { useSyncExternalStore } from 'react';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(callback: () => void) {
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    mediaQuery.addEventListener('change', callback);

    return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
    return window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServerSnapshot() {
    // Start with the poster on the server so video bytes never compete with HTML/LCP.
    return true;
}

type DecorativeHeroVideoProps = {
    className: string;
    poster: string;
    revealOnMetadata?: boolean;
};

export function DecorativeHeroVideo({
    className,
    poster,
    revealOnMetadata = false,
}: DecorativeHeroVideoProps) {
    const prefersReducedMotion = useSyncExternalStore(
        subscribeToReducedMotion,
        getReducedMotionSnapshot,
        getReducedMotionServerSnapshot,
    );

    return (
        <video
            autoPlay={!prefersReducedMotion}
            muted
            loop={!prefersReducedMotion}
            playsInline
            preload="none"
            className={className}
            poster={poster}
            aria-hidden="true"
            tabIndex={-1}
            onLoadedMetadata={revealOnMetadata ? (event) => {
                event.currentTarget.style.opacity = '1';
            } : undefined}
        >
            {!prefersReducedMotion && (
                <>
                    <source
                        src="/images/_assets/video_hero-720p.mp4"
                        type="video/mp4"
                        media="(max-width: 767px)"
                    />
                    <source
                        src="/images/_assets/video_hero-1080p.webm"
                        type="video/webm"
                        media="(min-width: 768px)"
                    />
                    <source
                        src="/images/_assets/video_hero-1080p.mp4"
                        type="video/mp4"
                        media="(min-width: 768px)"
                    />
                </>
            )}
        </video>
    );
}
