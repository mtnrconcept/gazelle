import styles from './OrderBanner.module.css';

export function OrderBanner() {
    return (
        <section className={`${styles.section} panel reveal`} data-reveal="up">
            <div className={`container ${styles.container}`}>
                <p className={styles.eyebrow}>Livraison</p>
                <h2 className={styles.title} data-text="Commandez en livraison">Commandez en livraison</h2>
                <p className={styles.subtitle}>
                    Savourez nos plats chez vous via nos partenaires de livraison
                </p>
                <div className={styles.links}>
                    <a
                        href="https://www.ubereats.com/store/la-gazelle-dor/ZyYBaGTYWA6WDQYUbQveaA?diningMode=DELIVERY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.platformBtn}
                    >
                        Uber Eats
                    </a>
                    <a
                        href="https://www.smood.ch/fr/store/la-gazelle-dor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.platformBtn}
                    >
                        Smood
                    </a>
                </div>
            </div>
        </section>
    );
}
