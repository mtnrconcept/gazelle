import styles from './ReviewSection.module.css';

const reviews = [
    {
        author: "Amal T.",
        rating: 5,
        text: "Cuisine éthiopienne authentique et délicieuse! L'ambiance chaleureuse et le service impeccable. Je recommande vivement le kitfo et l'injera.",
        time: "il y a 2 jours"
    },
    {
        author: "Marco S.",
        rating: 5,
        text: "Excellent restaurant africain à Genève. Les plats sont savoureux et copieux. Le café traditionnel est un must! Personnel très accueillant.",
        time: "il y a 5 jours"
    },
    {
        author: "Fatima H.",
        rating: 4,
        text: "Une expérience culinaire extraordinaire. Les épices sont parfaitement dosées et l'atmosphère nous transporte directement en Afrique de l'Est.",
        time: "il y a 1 semaine"
    }
];

export function ReviewSection() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>Ce que disent nos clients</h2>
                <div className={styles.grid}>
                    {reviews.map((review, idx) => (
                        <div key={idx} className={styles.card}>
                            <div className={styles.header}>
                                <div className={styles.avatar}>{review.author.charAt(0)}</div>
                                <div>
                                    <div className={styles.author}>{review.author}</div>
                                    <div className={styles.stars}>
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} style={{ color: i < review.rating ? "#DAA520" : "#ccc" }}>★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className={styles.text}>"{review.text}"</p>
                            <span className={styles.time}>{review.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
