import Link from 'next/link';

export function Footer() {
    return (
        <footer id="contact" className="footer-root">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brandCol">
                        <h3 className="footer-logoTitle">La Gazelle d'Or</h3>
                        <p className="footer-tagline">
                            Les saveurs authentiques de l'Érythrée et de l'Éthiopie au cœur de Genève.
                        </p>
                        <div className="footer-socials">
                            <a
                                href="https://www.facebook.com/lagazelledorgeneva"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="footer-socialLink"
                            >
                                Facebook
                            </a>
                            <a
                                href="https://www.instagram.com/lagazelledorgeneva"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="footer-socialLink"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://www.tiktok.com/@la.gazelle.dor.ge"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="footer-socialLink"
                            >
                                TikTok
                            </a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-colTitle">Navigation</h4>
                        <nav className="footer-navLinks">
                            <Link href="/" className="footer-navLink">Accueil</Link>
                            <Link href="/menu" className="footer-navLink">Notre Carte</Link>
                            <Link href="/histoire" className="footer-navLink">Notre Histoire</Link>
                            <Link href="/evenements" className="footer-navLink">Événements</Link>
                            <Link href="/evenements#traiteur" className="footer-navLink">Service Traiteur</Link>
                            <Link href="/contact" className="footer-navLink">Contact & Réservation</Link>
                        </nav>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-colTitle">Contact & Adresse</h4>
                        <div className="footer-contactItem">
                            <a
                                href="https://maps.google.com/?q=Rue+de+Lyon+55+1203+Genève"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-contactLink"
                            >
                                Rue de Lyon 55<br />1203 Genève
                            </a>
                        </div>
                        <div className="footer-contactItem">
                            <a href="tel:+41223403350" className="footer-contactLink">
                                +41 22 340 33 50
                            </a>
                        </div>
                        <div className="footer-contactItem">
                            <a href="mailto:lagazelledorgeneva@gmail.com" className="footer-contactLink">
                                lagazelledorgeneva@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-colTitle">Commander en ligne</h4>
                        <nav className="footer-navLinks">
                            <a href="https://www.ubereats.com/store/la-gazelle-dor/ZyYBaGTYWA6WDQYUbQveaA?diningMode=DELIVERY" target="_blank" rel="noopener noreferrer" className="footer-navLink">Uber Eats</a>
                            <a href="https://www.smood.ch/fr/store/la-gazelle-dor" target="_blank" rel="noopener noreferrer" className="footer-navLink">Smood</a>
                            <a href="https://www.just-eat.ch/fr/menu/gazelle-dor-african-village#pre-order" target="_blank" rel="noopener noreferrer" className="footer-navLink">Just Eat</a>
                        </nav>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-colTitle">Heures d'ouverture</h4>
                        <div className="footer-hoursList">
                            <p className="footer-hourRow">
                                <span className="footer-dayLabel">Lun – Sam</span>
                                <span>11h30 – 14h30</span>
                            </p>
                            <p className="footer-hourRow">
                                <span className="footer-dayLabel">Lun – Sam</span>
                                <span>18h30 – 22h30</span>
                            </p>
                            <p className="footer-hourRow footer-closed">
                                <span className="footer-dayLabel">Dimanche</span>
                                <span>Fermé</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} La Gazelle d'Or. Tous droits réservés. · Village africain · Restaurant érythréen & éthiopien à Genève</p>
                    <p className="footer-signature">Site réalisé par Raphaël Barman, +41 76 475 66 69</p>
                </div>
            </div>
        </footer>
    );
}
