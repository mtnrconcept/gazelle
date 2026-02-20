import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Notre Histoire - La Gazelle d'Or",
    description: "L'histoire de la Gazelle d'Or, un voyage culinaire de l'Érythrée à Genève.",
};

export default function HistoirePage() {
    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <h1 className={styles.heroTitle}>Notre Histoire</h1>
            </div>

            <div className={`container ${styles.content}`}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Des racines profondes</h2>
                    <p>
                        La cuisine érythréenne et éthiopienne est célèbre pour ses épices uniques, ses techniques de cuisson traditionnelles et son pain injera, une galette fermentée qui accompagne tous nos plats principaux.
                    </p>
                    <p>
                        Chez La Gazelle d'Or, nous perpétuons ces traditions avec fierté. Notre décor, notre ambiance et surtout nos assiettes sont conçus pour vous transporter instantanément dans la Corne de l'Afrique.
                    </p>
                </section>

                <section className={styles.grid}>
                    <div className={styles.card}>
                        <span className={styles.icon}>🌶️</span>
                        <h3>Épices Uniques</h3>
                        <p>Découvrez nos mélanges d'épices (Berbere, Mitmita) importés directement pour garantir l'authenticité.</p>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.icon}>☕</span>
                        <h3>Cérémonie du Café</h3>
                        <p>Le café est originaire de notre région. Nous célébrons ce rituel avec la torréfaction sur place et l'encens traditionnel.</p>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.icon}>🤝</span>
                        <h3>Hospitalité</h3>
                        <p>Le partage est au cœur de notre culture. Nos plats sont souvent servis dans un grand plat commun pour favoriser la convivialité.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
