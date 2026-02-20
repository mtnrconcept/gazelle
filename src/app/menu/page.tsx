import { menuData } from '@/data/menu';
import { MenuSection } from '@/components/MenuSection';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Menu - La Gazelle d'Or",
    description: "Découvrez notre carte : entrées, plats végétariens, viandes et spécialités éthiopiennes et érythréennes.",
};

export default function MenuPage() {
    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <h1 className={styles.heroTitle}>Notre Carte</h1>
            </div>

            <div className={`container ${styles.menuContainer}`}>
                {menuData.map((section, idx) => (
                    <MenuSection key={idx} section={section} />
                ))}
            </div>
        </div>
    );
}
