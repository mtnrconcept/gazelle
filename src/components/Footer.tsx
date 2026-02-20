import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer id="contact" className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>

                    {/* Brand Column */}
                    <div className={styles.brandCol}>
                        <h3 className={styles.logoTitle}>La Gazelle d'Or</h3>
                        <p className={styles.tagline}>
                            Les saveurs authentiques de l'Éthiopie et de l'Érythrée à Genève.
                        </p>
                        <div className={styles.socials}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                FB
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                IG
                            </a>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Contact</h4>
                        <div className={styles.contactItem}>
                            <span>Rue de Lyon 55, 1203 Genève</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span>+41 22 340 33 50</span>
                        </div>
                    </div>

                    {/* Hours Column */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Heures d'ouverture</h4>
                        <div className={styles.hoursList}>
                            <div className={styles.contactItem}>
                                <div>
                                    <p>Lun - Sam: 11h30 - 14h30</p>
                                    <p>Lun - Sam: 18h30 - 22h30</p>
                                    <p className={styles.closed}>Dimanche: Fermé</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.copyright}>
                    <p>&copy; {new Date().getFullYear()} La Gazelle d'Or. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
