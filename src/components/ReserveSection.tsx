import Link from 'next/link';
import styles from './ReserveSection.module.css';

export function ReserveSection() {
    return (
        <section id="contact" className={`${styles.section} panel decoratedSection reveal`} data-reveal="up">
            <div className={`container ${styles.container}`}>
                <div className={styles.card}>
                    <p className={styles.eyebrow}>Réservation</p>
                    <h2 className={styles.title}>Une table vous attend</h2>
                    <p className={styles.subtitle}>
                        Offrez-vous un moment hors du temps. Service attentionné, atmosphère feutrée et cuisine traditionnelle.
                    </p>
                    <div className={styles.actions}>
                        <a href="tel:+41223403350" className={styles.primaryButton}>Réserver par téléphone</a>
                        <Link href="/contact" className={styles.secondaryButton}>
                            Réserver en ligne
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
