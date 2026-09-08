"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const secondarySlides = [
    '/images/6.webp',
    '/images/7.webp',
    '/images/8.webp',
    '/images/9.webp',
];
const totalSlides = secondarySlides.length + 1;

function seededRandom(seed: number) {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
}

const dustMotes = Array.from({ length: 35 }, (_, i) => {
    const seeded = (n: number) => seededRandom(i * 6 + n);

    return {
        id: i,
        left: seeded(1) * 100,
        top: seeded(2) * 100,
        delay: seeded(3) * 12,
        duration: 8 + seeded(4) * 10,
        size: 1.5 + seeded(5) * 3.5,
        opacity: 0.15 + seeded(6) * 0.55,
    };
});

function DustParticles() {
    return (
        <div className="hero-dustLayer" aria-hidden="true">
            <div className="hero-sunbeam" />
            <div className="hero-sunbeam2" />

            {dustMotes.map((mote) => (
                <span
                    key={mote.id}
                    className="hero-dustMote"
                    style={{
                        left: `${mote.left}%`,
                        top: `${mote.top}%`,
                        animationDelay: `${mote.delay}s`,
                        animationDuration: `${mote.duration}s`,
                        width: `${mote.size}px`,
                        height: `${mote.size}px`,
                        opacity: mote.opacity,
                    }}
                />
            ))}
        </div>
    );
}

export function Hero() {
    const [current, setCurrent] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const leafRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let frameId: number | null = null;

        const updateParallax = () => {
            frameId = null;
            const scrollY = window.scrollY || window.pageYOffset || 0;

            sectionRef.current?.style.setProperty('--scroll-y', `${scrollY}px`);

            if (leafRef.current) {
                leafRef.current.style.transform = `translateX(${scrollY * -0.15}px) translateY(${scrollY * -0.03}px) scale(0.9)`;
            }
        };

        const handleScroll = () => {
            if (frameId !== null) return;
            frameId = window.requestAnimationFrame(updateParallax);
        };

        updateParallax();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (frameId !== null) window.cancelAnimationFrame(frameId);
        };
    }, []);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setCurrent((previous) => (previous + 1) % totalSlides);
        }, 6000);

        return () => window.clearInterval(interval);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="hero-section panel heroFullBleed"
        >
            <div className="hero-slideshow">
                {/* Slide 0 — LCP element: static <picture> with explicit srcset to bypass /_next/image */}
                <picture>
                    <source
                        type="image/avif"
                        srcSet="/images/hero/lcp-360w.avif 360w, /images/hero/lcp-480w.avif 480w, /images/hero/lcp-640w.avif 640w, /images/hero/lcp-828w.avif 828w, /images/hero/lcp-1080w.avif 1080w, /images/hero/lcp-1280w.avif 1280w, /images/hero/lcp-1600w.avif 1600w"
                        sizes="100vw"
                    />
                    <source
                        type="image/webp"
                        srcSet="/images/hero/lcp-360w.webp 360w, /images/hero/lcp-480w.webp 480w, /images/hero/lcp-640w.webp 640w, /images/hero/lcp-828w.webp 828w, /images/hero/lcp-1080w.webp 1080w, /images/hero/lcp-1280w.webp 1280w, /images/hero/lcp-1600w.webp 1600w"
                        sizes="100vw"
                    />
                    <img
                        src="/images/hero/lcp-1080w.webp"
                        alt=""
                        aria-hidden="true"
                        decoding="async"
                        fetchPriority="high"
                        className={`hero-slide ${current === 0 ? 'hero-slideActive' : ''}`}
                    />
                </picture>
                {secondarySlides.map((src, index) => (
                    <Image
                        key={src}
                        src={src}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="100vw"
                        loading="lazy"
                        quality={65}
                        className={`hero-slide ${index + 1 === current ? 'hero-slideActive' : ''}`}
                    />
                ))}
            </div>

            <div className="hero-overlay" />
            <DustParticles />

            <span
                ref={leafRef}
                className="hero-behindLeaf"
                aria-hidden="true"
                style={{ backgroundImage: "url('/images/palm-leaf-left3.png')" }}
            />

            <div className="hero-topContent">
                <h1 className="hero-title" data-text="La Gazelle d'Or">La Gazelle d&apos;Or</h1>
                <p className="hero-location">Genève</p>
            </div>

            <div className="hero-bottomContent">
                <p className="hero-tagline">Voyage culinaire au cœur de l&apos;Afrique</p>
                <Link href="/menu" className="hero-ctaButton">
                    <span className="hero-ctaText">Découvrir</span>
                </Link>
            </div>

            <div className="hero-scrollIndicator">
                <div className="hero-scrollLine" />
            </div>
        </section>
    );
}
