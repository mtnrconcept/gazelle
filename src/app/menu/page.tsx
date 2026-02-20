"use client";

import { useState } from 'react';
import { menuData } from '@/data/menu';
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
    degustations: 'MENU DEGUSTATION',
    boissons: 'BOISSONS',
};

export default function MenuPage() {
    const [activeTab, setActiveTab] = useState('all');

    const visibleSections = activeTab === 'all'
        ? menuData
        : menuData.filter((s) => s.title === tabMap[activeTab]);

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.heroEyebrow}>Restaurant éthiopien & érythréen</p>
                    <h1 className={styles.heroTitle}>Notre Carte</h1>
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
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`container ${styles.menuContainer}`}>
                {visibleSections.map((section, idx) => (
                    <MenuSection key={idx} section={section} />
                ))}
            </div>

            <SignatureSection />
            <GallerySection />
            <ReserveSection />
        </div>
    );
}
