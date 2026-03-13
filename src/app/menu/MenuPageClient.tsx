"use client";

import { useState, useEffect } from 'react';
import type { MenuSectionData } from '@/types/menu';
import { MenuSection } from '@/components/MenuSection';
import { SignatureSection } from '@/components/SignatureSection';
import { GallerySection } from '@/components/GallerySection';
import { ReserveSection } from '@/components/ReserveSection';
import styles from './page.module.css';

const tabs = [
    { id: 'all', label: '✦ Tout' },
    { id: 'entrees', label: 'Entrées' },
    { id: 'vegetarien', label: 'Végétarien' },
    { id: 'plats', label: 'Plats' },
    { id: 'degustations', label: 'Menus' },
    { id: 'boissons', label: 'Boissons' },
];

const tabMap: Record<string, string> = {
    entrees: 'ENTRÉES / STARTERS',
    vegetarien: 'PLATS VÉGÉTARIENS / VEGAN',
    plats: 'PLATS PRINCIPAUX',
    degustations: 'MENU DÉGUSTATION',
    boissons: 'BOISSONS',
};

type MenuPageClientProps = {
    sections: MenuSectionData[];
};

export function MenuPageClient({ sections }: MenuPageClientProps) {
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        requestAnimationFrame(() => {
            const nodes = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible), [data-reveal]:not(.is-visible)');
            if (nodes.length === 0) return;

            // Immediately reveal elements already in view
            nodes.forEach((node) => {
                const rect = node.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    node.classList.add('is-visible');
                }
            });

            // Observe elements below the fold so they animate on scroll
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            (entry.target as HTMLElement).classList.add('is-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { rootMargin: '0px 0px -2% 0px', threshold: 0.05 }
            );

            nodes.forEach((node) => {
                if (!node.classList.contains('is-visible')) {
                    observer.observe(node);
                }
            });

            return () => observer.disconnect();
        });
    }, [activeTab]);

    const visibleSections = activeTab === 'all'
        ? sections
        : sections.filter((s) => s.title === tabMap[activeTab]);

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.heroEyebrow}>Restaurant éthiopien & érythréen</p>
                    <h1 className={styles.heroTitle} data-text="Menu éthiopien & érythréen">Menu éthiopien &amp; érythréen</h1>
                    <p className={styles.heroTagline}>Tous nos plats sont servis avec de l'injera fait maison</p>
                </div>
            </div>

            <div className={styles.tabsRow}>
                <div className={`container ${styles.tabsInner}`}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                            onClick={(e) => {
                                setActiveTab(tab.id);
                                (e.currentTarget as HTMLButtonElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`container ${styles.menuContainer}`}>
                {visibleSections.map((section) => (
                    <MenuSection key={section.title} section={section} />
                ))}
            </div>

            <SignatureSection />
            <GallerySection />
            <ReserveSection />
        </div>
    );
}
