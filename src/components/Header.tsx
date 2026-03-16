"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ExternalLink, ChevronDown, Phone, UtensilsCrossed } from 'lucide-react';

const navLeft = [
  { href: '/', label: 'Accueil' },
  { href: '/histoire', label: 'À propos' },
  { href: '/menu', label: 'Menu' },
];

const navRight = [
  { href: '/evenements', label: 'Événements' },
  { href: '/contact', label: 'Contact' },
];

const deliveryLinks = [
  {
    href: 'https://www.ubereats.com/store/la-gazelle-dor/ZyYBaGTYWA6WDQYUbQveaA?diningMode=DELIVERY',
    label: 'Uber Eats',
    className: 'header-dropdownLink--uberEats',
  },
  {
    href: 'https://www.smood.ch/fr/store/la-gazelle-dor',
    label: 'Smood',
    className: 'header-dropdownLink--smood',
  },
  {
    href: 'https://www.just-eat.ch/fr/menu/gazelle-dor-african-village',
    label: 'Just Eat',
    className: 'header-dropdownLink--justEat',
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Calcule et met à jour dynamiquement la hauteur du header dans une variable CSS globale
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-h', `${Math.max(height, 80)}px`);
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [pathname]);

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
              alt="La Gazelle d'Or"
              className="header-brandMark"
            />
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

            {/* Dropdown Commander */}
            <div className="header-dropdown" ref={dropdownRef}>
              <button
                className="header-reserveButton"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-expanded={isDropdownOpen}
              >
                Commander
                <ChevronDown size={14} className={`header-dropdownChevron ${isDropdownOpen ? 'header-dropdownChevronOpen' : ''}`} />
              </button>
              <div className={`header-dropdownMenu ${isDropdownOpen ? 'header-dropdownMenuOpen' : ''}`}>
                <span className="header-dropdownLabel">Livraison</span>
                {deliveryLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`header-dropdownLink ${link.className}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={12} />
                  </a>
                ))}
                <span className="header-dropdownDivider" />
                <span className="header-dropdownLabel">Sur place</span>
                <a href="tel:+41223403350" className="header-dropdownLink header-dropdownLink--phone" onClick={() => setIsDropdownOpen(false)}>
                  <Phone size={14} />
                  <span>Réserver par téléphone</span>
                </a>
                <Link href="/contact" className="header-dropdownLink header-dropdownLink--form" onClick={() => setIsDropdownOpen(false)}>
                  <UtensilsCrossed size={14} />
                  <span>Réserver en ligne</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="header-mobileRow">
          <Link href="/" className="header-brand">
            <img
              src="/images/logo.webp"
              alt="La Gazelle d'Or"
              className="header-brandMark"
            />
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
          <span className="header-mobileSectionLabel">Commander en livraison</span>
          <div className="header-mobileDeliveryLinks">
            {deliveryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="header-mobileDeliveryBtn"
                onClick={toggleMenu}
              >
                {link.label}
                <ExternalLink size={14} style={{ marginLeft: '4px' }} />
              </a>
            ))}
          </div>
          <a href="tel:+41223403350" className="header-mobileCtaButton" onClick={toggleMenu}>
            Réserver · +41 22 340 33 50
          </a>
        </div>
      </div>
    </header>
  );
}
