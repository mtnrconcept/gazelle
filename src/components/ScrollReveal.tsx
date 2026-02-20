"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset all reveal elements so they re-animate on each page
    const allReveal = document.querySelectorAll<HTMLElement>('.reveal, [data-reveal]');
    allReveal.forEach((el) => el.classList.remove('is-visible'));

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], .reveal'));
    if (nodes.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -2% 0px', threshold: 0.05 }
    );

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        node.classList.add('is-visible');
      } else {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
