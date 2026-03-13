import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer id="contact" className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    <div className={styles.brandCol}>
                        <h3 className={styles.logoTitle}>La Gazelle d'Or</h3>
                        <p className={styles.tagline}>
                            Les saveurs authentiques de l'Éthiopie et de l'Érythrée au cœur de Genève.
                        </p>
                        <div className={styles.socials}>
                            <a
                                href="https://www.facebook.com/lagazelledorgeneva"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className={styles.socialLink}
                            >
                                Facebook
                            </a>
                            <a
                                href="https://www.instagram.com/lagazelledorgeneva"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className={styles.socialLink}
                            >
                                Instagram
                            </a>
                        </div>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Navigation</h4>
                        <nav className={styles.navLinks}>
                            <Link href="/" className={styles.navLink}>Accueil</Link>
                            <Link href="/menu" className={styles.navLink}>Notre Carte</Link>
                            <Link href="/histoire" className={styles.navLink}>Notre Histoire</Link>
                            <Link href="/evenements" className={styles.navLink}>Événements</Link>
                            <Link href="/contact" className={styles.navLink}>Contact & Réservation</Link>
                        </nav>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Contact & Adresse</h4>
                        <div className={styles.contactItem}>
                            <a
                                href="https://maps.google.com/?q=Rue+de+Lyon+55+1203+Genève"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.contactLink}
                            >
                                Rue de Lyon 55<br />1203 Genève
                            </a>
                        </div>
                        <div className={styles.contactItem}>
                            <a href="tel:+41223403350" className={styles.contactLink}>
                                +41 22 340 33 50
                            </a>
                        </div>
                        <div className={styles.contactItem}>
                            <a href="mailto:lagazelledorgeneva@gmail.com" className={styles.contactLink}>
                                lagazelledorgeneva@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Commander en ligne</h4>
                        <nav className={styles.navLinks}>
                            <a href="https://www.ubereats.com/store/la-gazelle-dor/ZyYBaGTYWA6WDQYUbQveaA?diningMode=DELIVERY" target="_blank" rel="noopener noreferrer" className={styles.navLink}>Uber Eats</a>
                            <a href="https://www.smood.ch/fr/store/la-gazelle-dor" target="_blank" rel="noopener noreferrer" className={styles.navLink}>Smood</a>
                        </nav>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Heures d'ouverture</h4>
                        <div className={styles.hoursList}>
                            <p className={styles.hourRow}>
                                <span className={styles.dayLabel}>Lun – Sam</span>
                                <span>11h30 – 14h30</span>
                            </p>
                            <p className={styles.hourRow}>
                                <span className={styles.dayLabel}>Lun – Sam</span>
                                <span>18h30 – 22h30</span>
                            </p>
                            <p className={`${styles.hourRow} ${styles.closed}`}>
                                <span className={styles.dayLabel}>Dimanche</span>
                                <span>Fermé</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <p>&copy; {new Date().getFullYear()} La Gazelle d'Or. Tous droits réservés. · Village africain · Restaurant éthiopien & érythréen à Genève</p>
                    <p className={styles.signature}>Site réalisé par Raphël Barman, +41 76 475 66 69</p>
                </div>
            </div>
        </footer>
    );
}
