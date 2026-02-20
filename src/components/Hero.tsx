"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const slides = [
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
];

export function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`${styles.hero} panel`}>
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

            <div className={styles.overlay}></div>

            {/* Brand – upper area */}
            <div className={styles.topContent}>
                <img
                    src="/images/logo.png"
                    alt="La Gazelle d'Or"
                    className={styles.emblem}
                />
                <h1 className={styles.title}>La Gazelle d'Or</h1>
                <p className={styles.location}>Geneva</p>
            </div>

            {/* Tagline + CTA – lower area */}
            <div className={styles.bottomContent}>
                <p className={styles.tagline}>Voyage culinaire au cœur de l'Afrique</p>
                <Link href="/menu" className={styles.ctaButton}>
                    Découvrir
                </Link>
            </div>
        </section>
    );
}
