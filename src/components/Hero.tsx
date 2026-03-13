"use client";

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import styles from './Hero.module.css';

const slides = [
    '/images/5.webp',
    '/images/6.webp',
    '/images/7.webp',
    '/images/8.webp',
    '/images/9.webp',
];

function seededRandom(seed: number) {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
}

function DustParticles() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const motes = useMemo(() =>
        Array.from({ length: 35 }, (_, i) => {
            const s = (n: number) => seededRandom(i * 6 + n);
            return {
                id: i,
                left: s(1) * 100,
                top: s(2) * 100,
                delay: s(3) * 12,
                duration: 8 + s(4) * 10,
                size: 1.5 + s(5) * 3.5,
                opacity: 0.15 + s(6) * 0.55,
            };
        }), []
    );

    if (!mounted) return null;

    return (
        <div className={styles.dustLayer} aria-hidden="true">
            <div className={styles.sunbeam} />
            <div className={styles.sunbeam2} />

            {motes.map((m) => (
                <span
                    key={m.id}
                    className={styles.dustMote}
                    style={{
                        left: `${m.left}%`,
                        top: `${m.top}%`,
                        animationDelay: `${m.delay}s`,
                        animationDuration: `${m.duration}s`,
                        width: `${m.size}px`,
                        height: `${m.size}px`,
                        opacity: m.opacity,
                    }}
                />
            ))}
        </div>
    );
}

export function Hero() {
    const [current, setCurrent] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section 
            className={`${styles.hero} panel heroFullBleed`}
            style={{ '--scroll-y': `${scrollY}px` } as React.CSSProperties}
        >
            <div className={styles.slideshow}>
                {slides.map((src, idx) => (
                    <img
                        key={src}
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className={`${styles.slide} ${idx === current ? styles.slideActive : ''}`}
                    />
                ))}
            </div>

            <div className={styles.overlay} />
            <DustParticles />

            {/* Feuille derrière le texte */}
            <span
                className={styles.behindLeaf}
                aria-hidden="true"
                style={{
                    backgroundImage: "url('/images/palm-leaf-left3.png')",
                    transform: `translateX(${scrollY * -0.15}px) translateY(${scrollY * -0.03}px) scale(0.9)`,
                }}
            />

            {/* Brand — logo, title, location */}
            <div className={styles.topContent}>
                <h1 className={styles.title} data-text="La Gazelle d'Or">La Gazelle d&apos;Or</h1>
                <p className={styles.location}>Geneva</p>
            </div>

            {/* Tagline + CTA */}
            <div className={styles.bottomContent}>
                <p className={styles.tagline}>Voyage culinaire au cœur de l&apos;Afrique</p>
                <Link href="/menu" className={styles.ctaButton}>
                    <span className={styles.ctaText}>Découvrir</span>
                </Link>
            </div>

            {/* Scroll indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.scrollLine} />
            </div>
        </section>
    );
}
