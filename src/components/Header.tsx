import Link from 'next/link';
// import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import styles from './Header.module.css';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoTitle}>La Gazelle d'Or</span>
                    <span className={styles.logoSubtitle}>Village Africain</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    <Link href="/" className={styles.navLink}>Accueil</Link>
                    <Link href="/menu" className={styles.navLink}>Menu</Link>
                    <Link href="/histoire" className={styles.navLink}>Histoire</Link>
                    <Link href="#contact" className={styles.navLink}>Contact</Link>
                    <a href="tel:+41223403350" className={styles.ctaButton}>
                        {/* <Phone size={16} /> */}
                        <span>Réserver</span>
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
                    {/* {isMenuOpen ? <X /> : <Menu />} */}
                    Menu
                </button>

                {/* Mobile Navigation */}
                <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
                    <Link href="/" className={styles.mobileNavLink} onClick={toggleMenu}>Accueil</Link>
                    <Link href="/menu" className={styles.mobileNavLink} onClick={toggleMenu}>Menu</Link>
                    <Link href="/histoire" className={styles.mobileNavLink} onClick={toggleMenu}>Histoire</Link>
                    <Link href="#contact" className={styles.mobileNavLink} onClick={toggleMenu}>Contact</Link>
                    <a href="tel:+41223403350" className={styles.mobileCtaButton} onClick={toggleMenu}>
                        Appeler pour Réserver
                    </a>
                </div>
            </div>
        </header>
    );
}
