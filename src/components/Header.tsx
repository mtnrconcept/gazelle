"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

const navLeft = [
  { href: '/', label: 'Accueil' },
  { href: '/histoire', label: 'À propos' },
  { href: '/menu', label: 'Menu' },
  { href: '/evenements', label: 'Événements' },
];

const navRight = [
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Calcule et met à jour dynamiquement la hauteur du header dans une variable CSS globale
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        // Obtenir la hauteur réelle incluant les bordures et les padding
        const height = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-h', `${Math.max(height, 80)}px`);
      }
    };

    // Mise à jour initiale
    updateHeaderHeight();

    // Surveillance des changements de taille (redimensionnement de fenêtre, etc.)
    const resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [pathname]); // Relancer si la page change (au cas où le header est différent)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header ref={headerRef} className="header-root">
      <div className="container header-container">
        <nav className="header-desktopNav">
          <div className="header-navGroup">
            {navLeft.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`header-navLink ${isActive(item.href) ? 'header-navLinkActive' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/" className="header-brand">
            <img
              src="/images/logo.webp"
              alt="Ornement"
              className="header-brandMark"
            />
            <span className="header-brandTitle">La Gazelle d'Or</span>
            <span className="header-brandSubtitle">Geneva</span>
          </Link>

          <div className="header-navGroup">
            {navRight.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`header-navLink ${isActive(item.href) ? 'header-navLinkActive' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="header-deliveryLinks">
              <a
                href="https://www.ubereats.com/store/la-gazelle-dor/ZyYBaGTYWA6WDQYUbQveaA?diningMode=DELIVERY"
                target="_blank"
                rel="noopener noreferrer"
                className="header-deliveryLink header-uberEats"
                title="Commander sur Uber Eats"
              >
                <span>Uber Eats</span>
                <ExternalLink size={12} className="header-linkIcon" />
              </a>
              <a
                href="https://www.smood.ch/fr/store/la-gazelle-dor"
                target="_blank"
                rel="noopener noreferrer"
                className="header-deliveryLink header-smood"
                title="Commander sur Smood"
              >
                <span>Smood</span>
                <ExternalLink size={12} className="header-linkIcon" />
              </a>
            </div>

            <a href="tel:+41223403350" className="header-reserveButton">
              Réserver
            </a>
          </div>
        </nav>

        <div className="header-mobileRow">
          <Link href="/" className="header-brand">
            <img
              src="/images/logo.webp"
              alt="Ornement"
              className="header-brandMark"
            />
            <span className="header-brandTitle">La Gazelle d'Or</span>
          </Link>
          <button className="header-mobileMenuBtn" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? '✕' : '☰ Menu'}
          </button>
        </div>

        {isMenuOpen && (
          <div className="header-backdrop" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
        )}
        <div className={`header-mobileNav ${isMenuOpen ? 'header-open' : ''}`}>
          {[...navLeft, ...navRight].map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`header-mobileNavLink ${isActive(item.href) ? 'header-mobileNavLinkActive' : ''}`}
              onClick={toggleMenu}
            >
              {item.label}
            </Link>
          ))}
          <div className="header-mobileDeliveryLinks">
            <a
              href="https://www.ubereats.com/store/la-gazelle-dor/ZyYBaGTYWA6WDQYUbQveaA?diningMode=DELIVERY"
              target="_blank"
              rel="noopener noreferrer"
              className="header-mobileDeliveryBtn"
            >
              Uber Eats
              <ExternalLink size={14} style={{ marginLeft: '4px' }} />
            </a>
            <a
              href="https://www.smood.ch/fr/store/la-gazelle-dor"
              target="_blank"
              rel="noopener noreferrer"
              className="header-mobileDeliveryBtn"
            >
              Smood
              <ExternalLink size={14} style={{ marginLeft: '4px' }} />
            </a>
          </div>
          <a href="tel:+41223403350" className="header-mobileCtaButton" onClick={toggleMenu}>
            Réserver · +41 22 340 33 50
          </a>
        </div>
      </div>
    </header>
  );
}
