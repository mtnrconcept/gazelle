'use client';

import { useEffect, useMemo, useState } from 'react';
import type { MenuItem as MenuItemSource, MenuSection as MenuSectionSource } from '@/data/menu';
import type { MenuItemData, MenuSectionData } from '@/types/menu';
import { MenuSection as MenuSectionComponent } from '@/components/MenuSection';
import { ReserveSection } from '@/components/ReserveSection';

const tabs = [
    { id: 'all', label: '✦ Tout' },
    { id: 'signature', label: 'Plats signatures' },
    { id: 'entrees', label: 'Entrées' },
    { id: 'vegetarien', label: 'Végétarien' },
    { id: 'plats', label: 'Plats + Plats du jour' },
    { id: 'degustations', label: 'Menus' },
    { id: 'streetfood', label: 'African Streetfood' },
    { id: 'boissons', label: 'Boissons' },
] as const;

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
    sections: MenuSectionSource[];
};

function buildSectionId(parentId: number, sortOrder: number): number {
    return parentId * 100 + sortOrder + 1;
}

function buildItemId(sectionId: number, sortOrder: number): number {
    return sectionId * 1000 + sortOrder + 1;
}

function normalizeItem(
    item: MenuItemSource,
    sortOrder: number,
    sectionId: number
): MenuItemData {
    return {
        id: buildItemId(sectionId, sortOrder),
        sortOrder,
        sectionId,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
    } as MenuItemData;
}

function normalizeSection(
    section: MenuSectionSource,
    sortOrder: number,
    parentId: number | null,
    parentSeed: number
): MenuSectionData {
    const sectionId = buildSectionId(parentSeed, sortOrder);

    const normalizedSubsections = (section.subsections ?? []).map((subsection, index) =>
        normalizeSection(subsection, index, sectionId, sectionId)
    );

    return {
        id: sectionId,
        title: section.title,
        notes: section.notes ?? [],
        sortOrder,
        parentId,
        items: (section.items ?? []).map((item, index) =>
            normalizeItem(item, index, sectionId)
        ),
        subsections: normalizedSubsections,
    } as MenuSectionData;
}

function normalizeSections(sections: MenuSectionSource[]): MenuSectionData[] {
    return sections.map((section, index) => normalizeSection(section, index, null, 1));
}

export function MenuPageClient({ sections }: MenuPageClientProps) {
    const [activeTab, setActiveTab] = useState('all');

    const normalizedSections = useMemo(() => normalizeSections(sections), [sections]);

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
            ? normalizedSections
            : normalizedSections.filter((section) => section.title === tabMap[activeTab]);

    return (
        <div className="menu-page">
            <div className="menu-hero">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="menu-heroVideo"
                    poster="/images/_assets/video_hero-poster.webp"
                    onLoadedMetadata={(e) => {
                        e.currentTarget.style.opacity = '1';
                    }}
                >
                    <source src="/images/_assets/video_hero-1080p.webm" type="video/webm" />
                    <source src="/images/_assets/video_hero-1080p.mp4" type="video/mp4" />
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
                        {"Tous nos plats sont servis avec de l'injera fait maison (Sans gluten disponible)"}
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
                    <MenuSectionComponent key={section.id} section={section} />
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
                                {"Organisez vos événements avec les saveurs de La Gazelle d'Or. Buffets, réceptions et repas d'entreprise, sur devis."}
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