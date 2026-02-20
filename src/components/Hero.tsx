import Link from 'next/link';
import styles from './Hero.module.css';

export function Hero() {
    return (
        <section className={styles.hero}>
            <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.videoBackground}
            >
                <source src="https://lagazelledorgeneva.com/assets/video_hero-Ck-O8Wsn.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={styles.overlay}></div>

            <div className={`container ${styles.content}`}>
                <img
                    src="https://lagazelledorgeneva.com/assets/logo-hero-B4ENhAYs.png"
                    alt="La Gazelle d'Or Logo"
                    className={styles.heroLogo}
                />

                <div className={styles.ctaGroup}>
                    <Link href="/histoire" className={`${styles.ctaButton} ${styles.ctaOutline}`}>
                        Notre Histoire
                    </Link>
                    <Link href="/menu" className={`${styles.ctaButton} ${styles.ctaOutline}`}>
                        Découvrir le Menu
                    </Link>
                </div>
            </div>
        </section>
    );
}
