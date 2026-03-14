import type { MenuSectionData, MenuItemData } from '@/types/menu';

type MenuSectionProps = {
    section: MenuSectionData;
    level?: number;
};

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
    return (
        <div className="menu-card">
            {item.image && (
                <div className="menu-imageWrapper">
                    <img
                        src={item.image}
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
