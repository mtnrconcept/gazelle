"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const navLeft = [
  { href: '/', label: 'Accueil' },
  { href: '/histoire', label: 'À propos' },
  { href: '/menu', label: 'Menu' },
];

const navRight = [
  { href: '/evenements', label: 'Événements' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleRef = useRef(true);

  // Sync visibility state to <html> so other elements (e.g. sticky tabs) can react
  useEffect(() => {
    visibleRef.current = isVisible;
    document.documentElement.setAttribute('data-header', isVisible ? 'visible' : 'hidden');
  }, [isVisible]);

  useEffect(() => {
    const show = () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (!visibleRef.current) setIsVisible(true);
    };

    const scheduleHide = () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        if (window.scrollY >= 60) setIsVisible(false);
      }, 2500);
    };

    const handleScroll = () => {
      if (window.scrollY < 60) {
        show();
        return;
      }
      if (!visibleRef.current) setIsVisible(true);
      scheduleHide();
    };

    // Desktop: show when cursor approaches top
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80 && !visibleRef.current) show();
    };

    // Mobile: show when user starts touching (new scroll gesture)
    const handleTouchStart = () => {
      if (!visibleRef.current) setIsVisible(true);
      scheduleHide();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`${styles.header} ${isVisible ? '' : styles.headerHidden}`}>
      <div className={`container ${styles.container}`}>
        <nav className={styles.desktopNav}>
          <div className={styles.navGroup}>
            {navLeft.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/" className={styles.brand}>
            <img
              src="/images/logo.png"
              alt="Ornement"
              className={styles.brandMark}
            />
            <span className={styles.brandTitle}>La Gazelle d'Or</span>
            <span className={styles.brandSubtitle}>Geneva</span>
          </Link>

          <div className={styles.navGroup}>
            {navRight.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <a href="tel:+41223403350" className={styles.reserveButton}>
              Réserver
            </a>
          </div>
        </nav>

        <div className={styles.mobileRow}>
          <Link href="/" className={styles.brand}>
            <img
              src="/images/logo.png"
              alt="Ornement"
              className={styles.brandMark}
            />
            <span className={styles.brandTitle}>La Gazelle d'Or</span>
          </Link>
          <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? '✕' : '☰ Menu'}
          </button>
        </div>

        {isMenuOpen && (
          <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
        )}
        <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
          {[...navLeft, ...navRight].map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`${styles.mobileNavLink} ${isActive(item.href) ? styles.mobileNavLinkActive : ''}`}
              onClick={toggleMenu}
            >
              {item.label}
            </Link>
          ))}
          <a href="tel:+41223403350" className={styles.mobileCtaButton} onClick={toggleMenu}>
            Réserver · +41 22 340 33 50
          </a>
        </div>
      </div>
    </header>
  );
}
