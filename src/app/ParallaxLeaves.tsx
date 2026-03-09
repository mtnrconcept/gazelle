"use client";

import { useEffect, useMemo, useRef } from 'react';
import styles from './page.module.css';

export function ParallaxLeaves() {
  const layerRef = useRef<HTMLDivElement>(null);
  const pseudoRandom = (seed: number) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
  };

  const leaves = useMemo(() => {
    const positions = [
      { side: 'left', x: -14, y: -12, speed: 1.45 },
      { side: 'right', x: 58, y: 8, speed: 1.6 },
      { side: 'left', x: -16, y: 52, speed: 1.5 },
      { side: 'right', x: 60, y: 112, speed: 1.65, image: 'left' },
      { side: 'right', x: 62, y: 168, speed: 1.8 },
      { side: 'left', x: -16, y: 220, speed: 1.9 }
    ];

    return positions.map((leaf, index) => {
      const centerX = 50;
      const centerY = 50;
      const angleRad = Math.atan2(centerY - leaf.y, centerX - leaf.x);
      const angleDeg = (angleRad * 180) / Math.PI;
      const rotateJitter = (pseudoRandom(index + 1) * 16) - 8;
      const speedJitter = (pseudoRandom(index + 11) * 0.24) - 0.12;

      return {
        ...leaf,
        image: leaf.image ?? leaf.side,
        rotate: Math.round((angleDeg + rotateJitter) * 1e6) / 1e6,
        speed: Math.round(Math.max(1.3, leaf.speed + speedJitter) * 1e6) / 1e6
      };
    });
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let frame = 0;
    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const offset = scrollY * -0.55;
      layer.style.setProperty('--parallax-y', `${offset}px`);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.parallaxLayer} aria-hidden="true" ref={layerRef}>
      {leaves.map((leaf, index) => (
        <span
          key={`leaf-${index}`}
          className={`${styles.leaf} ${leaf.side === 'left' ? styles.leafLeft : styles.leafRight}`}
          style={{
            top: `${leaf.y}vh`,
            left: `${leaf.x}vw`,
            ['--leaf-rotate' as string]: `${leaf.rotate}deg`,
            ['--leaf-speed' as string]: `${leaf.speed}`,
            backgroundImage:
              leaf.image !== leaf.side
                ? `url('/images/palm-leaf-${leaf.image}.png')`
                : undefined
          }}
        />
      ))}
    </div>
  );
}
