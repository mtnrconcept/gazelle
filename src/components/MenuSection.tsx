import type { MenuSectionData, MenuItemData } from '@/types/menu';

const streetFoodImageByName: Record<string, string> = {
    "ABYSINIE": "/images/carte-menu/pizza%20abyssinie.png",
    "ASMARA": "/images/carte-menu/pizzaAsmara.png",
    "ADDIS ABEBA": "/images/carte-menu/pizza%20Addis%20Abeba.png",
    "MARGHERITA": "/images/carte-menu/pizza%20margarita.png",
    "VEGETARIANA": "/images/carte-menu/pzza%20v%C3%A9g%C3%A9tarienne.png",
    "PROSCIUTTO": "/images/carte-menu/pizza%20prosciutto.png",
    "ORIENTAL": "/images/carte-menu/pizza%20orientale.png",
    "4 FROMAGES": "/images/carte-menu/pizza%204%20fromages.png",
    "ZEGNI WET / TSEBHI": "/images/carte-menu/wrap%20ZEGNI%20WET%20TSEBHI.png",
    "DORO WET": "/images/carte-menu/wrap%202-DORO%20%20WET.png",
    "DORO ALECHA": "/images/carte-menu/wrap%20DORO%20ALECHA.png",
    "KITFO": "/images/carte-menu/wrap%20KITFO.png",
    "MESER WET / TSEBHI": "/images/carte-menu/wrap%20MESER%20WET%20TSEBHI.png",
    "SHURO": "/images/carte-menu/wrap%20SHURO.png",
    "ALECHA": "/images/carte-menu/wrap%20Alecha.png",
    "GOMEN / ATKELTI EPINARD": "/images/carte-menu/wrap%20GOMEN%20ATKELTI%20%20EPINARD.png",
    "PANINI ROUGE": "/images/carte-menu/panini%20rouge.PNG",
    "PANINI POULET": "/images/carte-menu/panini%20poulet.PNG",
    "PANINI PESTO": "/images/carte-menu/panini%20pesto.PNG",
    "BOEUF": "/images/carte-menu/empanadas%20boeuf.PNG",
    "THON": "/images/carte-menu/empanadas%20thon.PNG",
    "JAMBON FROMAGE": "/images/carte-menu/empanadas%20jambon.PNG",
    "EPINARDS": "/images/carte-menu/empanadas%20epinard.PNG",
    "FRITES": "/images/carte-menu/frites.PNG",
};

type MenuSectionProps = {
    section: MenuSectionData;
    level?: number;
};

const menuImageFocusClassByName: Record<string, string> = {};

function getMenuImageFocusClass(name: string) {
    return menuImageFocusClassByName[name] ?? "";
}

export function MenuSection({ section, level = 1 }: MenuSectionProps) {
    const TitleTag = level === 1 ? 'h2' : 'h3';
    const revealDirection = level % 2 === 0 ? 'right' : 'up';

    return (
        <section className="menu-section reveal" data-reveal={revealDirection}>
            <TitleTag
                className={level === 1 ? "gold-sectionTitle menu-mainTitle" : "gold-sectionTitleSmall menu-subTitle"}
                data-text={section.title}
            >
                {section.title}
            </TitleTag>

            {section.notes && section.notes.length > 0 && (
                <div className="menu-notes">
                    {section.notes.map((note, idx) => (
                        <p key={idx}>{note}</p>
                    ))}
                </div>
            )}

            {section.items && section.items.length > 0 && (
                <div className="menu-grid">
                    {section.items.map((item) => (
                        <MenuItemCard key={item.name} item={item} />
                    ))}
                </div>
            )}

            {section.subsections && section.subsections.length > 0 && (
                <div className="menu-subsections">
                    {section.subsections.map((sub) => (
                        <MenuSection key={sub.title} section={sub} level={level + 1} />
                    ))}
                </div>
            )}
        </section>
    );
}

function MenuItemCard({ item }: { item: MenuItemData }) {
    const imageSrc = item.image ?? streetFoodImageByName[item.name];
    const imageFocusClass = getMenuImageFocusClass(item.name);

    return (
        <div className="menu-card">
            {imageSrc && (
                <div className={`menu-imageWrapper ${imageFocusClass}`.trim()}>
                    <img
                        src={imageSrc}
                        alt={item.name}
                        className="menu-image"
                        loading="lazy"
                    />
                </div>
            )}
            <div className="menu-cardContent">
                <div className="menu-header">
                    <h4 className="menu-itemName">{item.name}</h4>
                    {item.price && <span className="menu-price">{item.price}</span>}
                </div>
                {item.description && <p className="menu-description">{item.description}</p>}
            </div>
        </div>
    );
}
