"use client";

import { useEffect, useMemo, useRef } from 'react';
import styles from './page.module.css';

export function ParallaxLeaves() {
  const layerRef = useRef<HTMLDivElement>(null);
  const leaves = useMemo(() => {
    const positions = [
      { side: 'left', x: -14, y: -12, speed: 1.9 },
      { side: 'right', x: 58, y: 8, speed: 1.35 },
      { side: 'left', x: -13, y: 122, speed: 1.25 },

      { side: 'right', x: 62, y: 154, speed: 1.45 },
      { side: 'left', x: -16, y: 520, speed: 1.55 }
    ];

    return positions.map((leaf) => {
      const centerX = 50;
      const centerY = 50;
      const angleRad = Math.atan2(centerY - leaf.y, centerX - leaf.x);
      const angleDeg = (angleRad * 180) / Math.PI;
      const rotateJitter = (Math.random() * 16) - 21;
      const speedJitter = (Math.random() * 1.18) - 0.89;

      return {
        ...leaf,
        rotate: angleDeg + rotateJitter,
        speed: Math.max(1.6, leaf.speed + speedJitter)
      };
    });
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let frame = 0;
    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const offset = scrollY * -0.38;
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
            ['--leaf-speed' as string]: `${leaf.speed}`
          }}
        />
      ))}
    </div>
  );
}
