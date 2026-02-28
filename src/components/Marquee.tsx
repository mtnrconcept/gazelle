import styles from './Marquee.module.css';

const items = [
    'Injera maison',
    'Rituel du café',
    'Épices traditionnelles',
    'Partage convivial',
    'Cuisine érythréenne',
    'Saveurs éthiopiennes'
];

export function Marquee() {
    const text = items.join(' · ');

    return (
        <section className={`${styles.section} reveal`} data-reveal="up">
            <div className={`container ${styles.container}`}>
                <div className={styles.marquee} aria-hidden="true">
                    <div className={styles.track}>
                        <span>{text}</span>
                        <span>{text}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
