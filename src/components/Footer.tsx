import Link from 'next/link';
import { siteConfig } from '@/lib/site';

const socialLinks = [
    { href: siteConfig.sameAs[0], label: 'Facebook' },
    { href: siteConfig.sameAs[1], label: 'Instagram' },
    { href: siteConfig.sameAs[2], label: 'TikTok' },
] as const;

export function Footer() {
    return (
        <footer id="contact" className="footer-root">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brandCol">
                        <h3 className="footer-logoTitle">{siteConfig.name}</h3>
                        <p className="footer-tagline">
                            {"Les saveurs authentiques de l'Érythrée et de l'Éthiopie au cœur de Genève."}
                        </p>
                        <div className="footer-socials">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="footer-socialLink"
                                >
                                    {social.label}
                                </a>
                            ))}
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
                                {siteConfig.address.streetAddress}<br />
                                {siteConfig.address.postalCode} {siteConfig.address.addressLocality}
                            </a>
                        </div>
                        <div className="footer-contactItem">
                            <a href={`tel:${siteConfig.telephone}`} className="footer-contactLink">
                                {siteConfig.telephoneDisplay}
                            </a>
                        </div>
                        <div className="footer-contactItem">
                            <a href={`mailto:${siteConfig.email}`} className="footer-contactLink">
                                {siteConfig.email}
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
                        <h4 className="footer-colTitle">{"Heures d'ouverture"}</h4>
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
                    <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés. · Village africain · Restaurant érythréen & éthiopien à Genève</p>
                    <p className="footer-signature">Site réalisé par Raphaël Barman, +41 76 475 66 69</p>
                </div>
            </div>
        </footer>
    );
}
