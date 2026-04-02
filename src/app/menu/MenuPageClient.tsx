'use client';

import { useState, useEffect } from 'react';
import type { MenuSectionData } from '@/types/menu';
import { MenuSection } from '@/components/MenuSection';
import { ReserveSection } from '@/components/ReserveSection';

const signatureSection: MenuSectionData = {
    title: 'PLATS SIGNATURES',
    items: [
        {
            name: 'La Gazelle Royale',
            description:
                "Notre plat signature : Agneau, Zegni et Doro servis sur un grand injera partagé. Le symbole de notre restaurant.",
            price: 'dès 32 CHF',
            image: '/images/_assets/LA%20GAZELLE%20ROYALE-EI-niyer.png',
        },
        {
            name: 'Doro Wet',
            description:
                'Poulet juteux mariné au citron, mijoté dans une sauce paprika aux épices ancestrales. Un classique incontournable.',
            price: '27 CHF',
            image: '/images/_assets/DORO%20WET-qlKOx6dc.png',
        },
        {
            name: 'Sambusa Maison',
            description:
                'Feuilletés croustillants farcis à la viande ou aux légumes, faits chaque jour dans notre cuisine.',
            price: '3.50 CHF / pièce',
            image: '/images/_assets/SAMBUSA%20FAIT%20MAISON-D_wwG_sv.jpeg',
        },
        {
            name: 'Kitfo',
            description:
                "Steak tartare érythréen & éthiopien assaisonné d'un beurre aux herbes, de piments rouges et de gingembre frais.",
            price: '30 CHF',
            image: '/images/_assets/KITEFO-D2dNuOak.png',
        },
        {
            name: 'Degustation Vegetarienne',
            description:
                'Un assortiment généreux de Shiro, épinards, lentilles rouges et jaunes, chou et laitue sur injera.',
            price: '25 CHF',
            image: '/images/_assets/D%C3%A9gustation%20de%20L%C3%A9gumes-BHGAtiLV.png',
        },
        {
            name: "Tibs d'Agneau",
            description:
                "Morceaux d'agneau maigre sautés au beurre avec oignons, piments verts et poivre vert exotique.",
            price: '32 CHF',
            image: "/images/_assets/Tibs%20d'agneau-CTyXF8Tl.png",
        },
    ],
};

const tabs = [
    { id: 'all', label: '✦ Tout' },
    { id: 'signature', label: 'Plats signatures' },
    { id: 'entrees', label: 'Entrées' },
    { id: 'vegetarien', label: 'Végétarien' },
    { id: 'plats', label: 'Plats + Plats du jour' },
    { id: 'degustations', label: 'Menus' },
    { id: 'streetfood', label: 'African Streetfood' },
    { id: 'boissons', label: 'Boissons' },
];

const tabMap: Record<string, string> = {
    signature: 'PLATS SIGNATURES',
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

    const allSections = [signatureSection, ...sections];

    useEffect(() => {
        const container = document.querySelector('.menu-menuContainer');
        if (container) {
            container
                .querySelectorAll<HTMLElement>(
                    '.reveal:not(.is-visible), [data-reveal]:not(.is-visible)'
                )
                .forEach((node) => {
                    node.classList.add('is-visible');
                });
        }
    }, [activeTab]);

    const visibleSections =
        activeTab === 'all'
            ? allSections
            : allSections.filter((section) => section.title === tabMap[activeTab]);

    return (
        <div className="menu-page">
            <div className="menu-hero">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="menu-heroVideo"
                    poster="/images/2.webp"
                    onLoadedMetadata={(e) => {
                        e.currentTarget.style.opacity = '1';
                    }}
                >
                    <source
                        src="/images/_assets/video_hero-Ck-O8Wsn.mp4"
                        type="video/mp4"
                    />
                </video>

                <div className="menu-heroContent">
                    <p className="menu-heroEyebrow">
                        {'Restaurant érythréen & éthiopien'}
                    </p>

                    <h1
                        className="heroPageTitle menu-heroTitle"
                        data-text="Menu érythréen & éthiopien"
                    >
                        {'Menu érythréen & éthiopien'}
                    </h1>

                    <p className="menu-heroTagline">
                        {
                            "Tous nos plats sont servis avec de l'injera fait maison (Sans gluten disponible)"
                        }
                    </p>
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

                                e.currentTarget.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'nearest',
                                    inline: 'center',
                                });

                                const menuContainer = document.querySelector('.menu-menuContainer');

                                if (menuContainer) {
                                    const offset = 220;
                                    const bodyRect = document.body.getBoundingClientRect().top;
                                    const elementRect = menuContainer.getBoundingClientRect().top;
                                    const elementPosition = elementRect - bodyRect;
                                    const offsetPosition = elementPosition - offset;

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth',
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

            <section className="menu-traiteurSection reveal" data-reveal="up">
                <div className="container">
                    <div className="menu-traiteurBox">
                        <div className="menu-traiteurContent">
                            <h2
                                className="gold-sectionTitleSmall"
                                data-text="Service Traiteur & Entreprise"
                            >
                                Service Traiteur & Entreprise
                            </h2>
                            <p>
                                {
                                    "Organisez vos événements avec les saveurs de La Gazelle d'Or. Buffets, réceptions et repas d'entreprise, sur devis."
                                }
                            </p>
                        </div>

                        <a
                            href="mailto:lagazelledorgeneva@gmail.com?subject=Demande de devis traiteur"
                            className="menu-traiteurButton"
                        >
                            Demander un devis
                        </a>
                    </div>
                </div>
            </section>

            <ReserveSection />
        </div>
    );
}