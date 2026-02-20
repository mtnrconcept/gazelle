"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function BodySnapManager() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.remove('snap-enabled');
  }, [pathname]);

  return null;
}
