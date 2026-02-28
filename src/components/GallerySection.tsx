import styles from './GallerySection.module.css';

const gallery = [
    { src: '/images/2.webp', alt: 'Ambiance La Gazelle d\'Or' },
    { src: 'https://lagazelledorgeneva.com/assets/SAMBUSA%20FAIT%20MAISON-D_wwG_sv.jpeg', alt: 'Sambusa fait maison' },
    { src: '/images/3.webp', alt: 'Intérieur du restaurant' },
    { src: 'https://lagazelledorgeneva.com/assets/SALADE%20DU%20CHEF-DwkqqRvX.jpg', alt: 'Salade du Chef' },
    { src: '/images/4.webp', alt: 'Décoration africaine' },
    { src: 'https://lagazelledorgeneva.com/assets/SPECIALITES%20DE%20LA%20MAISON-CNPs4Yvd.png', alt: 'Spécialités de la maison' },
    { src: '/images/5.webp', alt: 'Salle de restaurant' },
    { src: 'https://lagazelledorgeneva.com/assets/LA%20GAZELLE%20ROYALE-EI-niyer.png', alt: 'La Gazelle Royale' },
    { src: 'https://lagazelledorgeneva.com/assets/DORO%20WET-qlKOx6dc.png', alt: 'Doro Wet' },
    { src: '/images/6.webp', alt: 'Ambiance' },
    { src: 'https://lagazelledorgeneva.com/assets/TIMATUM%20SALADE-B7XlvVoD.jpg', alt: 'Timatum Salade' },
    { src: 'https://lagazelledorgeneva.com/assets/D%C3%A9gustation%20de%20L%C3%A9gumes-BHGAtiLV.png', alt: 'Dégustation de légumes' },
];

export function GallerySection() {
    return (
        <section className={`${styles.section} panel decoratedSection reveal`} data-reveal="up">
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <p className={styles.eyebrow}>Immersion culturelle</p>
                    <h2 className={styles.title}>L'ambiance La Gazelle d'Or</h2>
                </div>
                <div className={styles.carousel}>
                    {gallery.map((item, idx) => (
                        <div key={`${item.src}-${idx}`} className={styles.slide}>
                            <img src={item.src} alt={item.alt} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
