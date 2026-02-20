import Image from 'next/image';
import { MenuSection as MenuSectionType, MenuItem } from '@/data/menu';
import styles from './MenuSection.module.css';

type MenuSectionProps = {
    section: MenuSectionType;
    level?: number;
};

export function MenuSection({ section, level = 1 }: MenuSectionProps) {
    const TitleTag = level === 1 ? 'h2' : 'h3';

    return (
        <section className={styles.section}>
            <TitleTag className={level === 1 ? styles.mainTitle : styles.subTitle}>
                {section.title}
            </TitleTag>

            {section.notes && (
                <div className={styles.notes}>
                    {section.notes.map((note, idx) => (
                        <p key={idx}>{note}</p>
                    ))}
                </div>
            )}

            {section.items && (
                <div className={styles.grid}>
                    {section.items.map((item, idx) => (
                        <MenuItemCard key={idx} item={item} />
                    ))}
                </div>
            )}

            {section.subsections && (
                <div className={styles.subsections}>
                    {section.subsections.map((sub, idx) => (
                        <MenuSection key={idx} section={sub} level={level + 1} />
                    ))}
                </div>
            )}
        </section>
    );
}

function MenuItemCard({ item }: { item: MenuItem }) {
    const imageUrl = item.image ? `https://lagazelledorgeneva.com${item.image}` : null;

    return (
        <div className={styles.card}>
            {imageUrl && (
                <div className={styles.imageWrapper}>
                    <img
                        src={imageUrl}
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
