import type { MenuSectionData, MenuItemData } from '@/types/menu';
import styles from './MenuSection.module.css';

type MenuSectionProps = {
    section: MenuSectionData;
    level?: number;
};

export function MenuSection({ section, level = 1 }: MenuSectionProps) {
    const TitleTag = level === 1 ? 'h2' : 'h3';
    const revealDirection = level % 2 === 0 ? 'right' : 'up';

    return (
        <section className={`${styles.section} reveal`} data-reveal={revealDirection}>
            <TitleTag className={level === 1 ? styles.mainTitle : styles.subTitle}>
                {section.title}
            </TitleTag>

            {section.notes && section.notes.length > 0 && (
                <div className={styles.notes}>
                    {section.notes.map((note, idx) => (
                        <p key={idx}>{note}</p>
                    ))}
                </div>
            )}

            {section.items && section.items.length > 0 && (
                <div className={styles.grid}>
                    {section.items.map((item) => (
                        <MenuItemCard key={item.name} item={item} />
                    ))}
                </div>
            )}

            {section.subsections && section.subsections.length > 0 && (
                <div className={styles.subsections}>
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
        <div className={styles.card}>
            {item.image && (
                <div className={styles.imageWrapper}>
                    <img
                        src={item.image}
                        alt={item.name}
                        className={styles.image}
                        loading="lazy"
                    />
                </div>
            )}
            <div className={styles.cardContent}>
                <div className={styles.header}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    {item.price && <span className={styles.price}>{item.price}</span>}
                </div>
                {item.description && <p className={styles.description}>{item.description}</p>}
            </div>
        </div>
    );
}
