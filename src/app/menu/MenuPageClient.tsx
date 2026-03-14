"use client";

import { useState, useEffect } from 'react';
import type { MenuSectionData } from '@/types/menu';
import { MenuSection } from '@/components/MenuSection';
import { SignatureSection } from '@/components/SignatureSection';
import { GallerySection } from '@/components/GallerySection';
import { ReserveSection } from '@/components/ReserveSection';

const tabs = [
    { id: 'all', label: '✦ Tout' },
    { id: 'entrees', label: 'Entrées' },
    { id: 'vegetarien', label: 'Végétarien' },
    { id: 'plats', label: 'Plats' },
    { id: 'degustations', label: 'Menus' },
    { id: 'boissons', label: 'Boissons' },
];

const tabMap: Record<string, string> = {
    entrees: 'ENTREES / STARTERS',
    vegetarien: 'PLATS VEGETARIENS / VEGAN',
    plats: 'PLATS PRINCIPAUX',
    degustations: 'MENU DEGUSTATION',
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
        <div className="menu-page">
            <div className="menu-hero">
                <div className="menu-heroContent">
                    <p className="menu-heroEyebrow">Restaurant érythréen & éthiopien</p>
                    <h1 className="heroPageTitle menu-heroTitle" data-text="Menu erythreen & ethiopien">Menu erythreen &amp; ethiopien</h1>
                    <p className="menu-heroTagline">Tous nos plats sont servis avec de l'injera fait maison</p>
                </div>
            </div>

            <div className="menu-tabsRow">
                <div className="container menu-tabsInner">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`menu-tab ${activeTab === tab.id ? 'menu-tabActive' : ''}`}
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

            <div className="container menu-menuContainer">
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
