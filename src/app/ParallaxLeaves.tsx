"use client";

import { useEffect, useMemo, useRef } from 'react';

export function ParallaxLeaves() {
  const layerRef = useRef<HTMLDivElement>(null);

  const leaves = useMemo(() => [
    { image: 'left1', x: 0, y: 5, speed: 2.0, scale: 2.0, blur: 5, opacity: 0.5, zIndex: 1, side: 'left' as const },
    { image: 'left1', x: 0, y: 35, speed: 11.2, scale: 1.8, blur: 2, opacity: 0.45, zIndex: 1, side: 'left' as const },
    { image: 'left3', x: 100, y: 30, speed: 1.5, scale: 1.2, blur: 1, opacity: 0.2, zIndex: 1, side: 'right' as const },
    { image: 'left2', x: 100, y: 50, speed: 5.5, scale: 1.2, blur: 3, opacity: 0.5, zIndex: 1, side: 'right' as const },
  ], []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      layer.style.setProperty('--scroll-y', `${scrollY}px`);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="home-parallaxLayerFront" aria-hidden="true" ref={layerRef}>
      {leaves.map((leaf, index) => (
        <span
          key={`leaf-${index}`}
          className={`home-leaf ${leaf.side === 'right' ? 'home-leafRight' : ''}`}
          style={{
            top: `${leaf.y}vh`,
            left: `${leaf.x}%`,
            '--leaf-speed': leaf.speed,
            '--leaf-scale': leaf.scale,
            '--leaf-blur': `${leaf.blur}px`,
            '--leaf-opacity': leaf.opacity,
            '--leaf-z': leaf.zIndex,
            backgroundImage: `url('/images/palm-leaf-${leaf.image}.png')`
          } as any}
        />
      ))}
    </div>
  );
}
