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
    { id: 'plats', label: 'Plats + Plats du jour' },
    { id: 'degustations', label: 'Menus' },
    { id: 'streetfood', label: 'African Streetfood' },
    { id: 'boissons', label: 'Boissons' },
];

const tabMap: Record<string, string> = {
    entrees: 'ENTREES / STARTERS',
    vegetarien: 'PLATS VEGETARIENS / VEGAN',
    plats: 'PLATS PRINCIPAUX',
    degustations: 'MENU DEGUSTATION',
    streetfood: 'AFRICAN STREETFOOD',
    boissons: 'BOISSONS',
};

type MenuPageClientProps = {
    sections: MenuSectionData[];
};

export function MenuPageClient({ sections }: MenuPageClientProps) {
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        // When switching tabs, immediately reveal all menu items so they
        // don't stay hidden while the smooth scroll is still in progress.
        const container = document.querySelector('.menu-menuContainer');
        if (container) {
            container.querySelectorAll<HTMLElement>('.reveal:not(.is-visible), [data-reveal]:not(.is-visible)').forEach((node) => {
                node.classList.add('is-visible');
            });
        }
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
                    <p className="menu-heroTagline">Tous nos plats sont servis avec de l'injera fait maison (Sans gluten disponible)</p>
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
                                
                                // Scroll to the top of the menu container with an offset for the sticky tabs
                                const menuContainer = document.querySelector('.menu-menuContainer');
                                if (menuContainer) {
                                    const offset = 220; // sticky header + tabs height approximation
                                    const bodyRect = document.body.getBoundingClientRect().top;
                                    const elementRect = menuContainer.getBoundingClientRect().top;
                                    const elementPosition = elementRect - bodyRect;
                                    const offsetPosition = elementPosition - offset;

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth'
                                    });
                                }
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
            <section className="menu-traiteurSection reveal" data-reveal="up">
                <div className="container">
                    <div className="menu-traiteurBox">
                        <div className="menu-traiteurContent">
                            <h2 className="gold-sectionTitleSmall" data-text="Service Traiteur & Entreprise">Service Traiteur & Entreprise</h2>
                            <p>Organisez vos événements avec les saveurs de La Gazelle d'Or. Buffets, réceptions et repas d'entreprise, sur devis.</p>
                        </div>
                        <a href="mailto:lagazelledorgeneva@gmail.com?subject=Demande de devis traiteur" className="menu-traiteurButton">
                            Demander un devis
                        </a>
                    </div>
                </div>
            </section>

            <GallerySection />
            <ReserveSection />
        </div>
    );
}
