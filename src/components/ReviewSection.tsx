const reviews = [
    {
        author: "Amal T.",
        rating: 5,
        text: "Cuisine éthiopienne authentique et délicieuse. L'ambiance chaleureuse et le service impeccable. Je recommande vivement le kitfo et l'injera.",
        time: "il y a 2 jours",
        source: "Google"
    },
    {
        author: "Marco S.",
        rating: 5,
        text: "Excellent restaurant africain à Genève. Les plats sont savoureux et copieux. Le café traditionnel est un must. Personnel très accueillant.",
        time: "il y a 5 jours",
        source: "Tripadvisor"
    },
    {
        author: "Fatima H.",
        rating: 4,
        text: "Une expérience culinaire extraordinaire. Les épices sont parfaitement dosées et l'atmosphère nous transporte directement en Afrique de l'Est.",
        time: "il y a 1 semaine",
        source: "TheFork"
    },
    {
        author: "Jean P.",
        rating: 5,
        text: "Service attentionné, décor soigné et plats incroyablement parfumés. Un vrai voyage.",
        time: "il y a 2 semaines",
        source: "Google"
    }
];

export function ReviewSection() {
    return (
        <section className="review-section reveal" data-reveal="right">
            <div className="container review-container">
                <div className="review-header">
                    <span className="review-kicker">Avis & retours</span>
                    <h2 className="gold-sectionTitle review-title" data-text="Ce que disent nos clients">Ce que disent nos clients</h2>
                    <p className="review-subtitle">
                        Des saveurs authentiques, un accueil chaleureux et une atmosphère intime qui font de chaque visite un souvenir.
                    </p>
                    <div className="review-summaryCard">
                        <div className="review-summaryScore">4.3</div>
                        <div className="review-summaryMeta">
                            <span>Note moyenne Google</span>
                            <span>+500 avis</span>
                        </div>
                        <div className="review-summaryTags">
                            <span>Ambiance</span>
                            <span>Service</span>
                            <span>Saveurs</span>
                        </div>
                    </div>
                </div>

                <div className="review-grid">
                    {reviews.map((review, idx) => (
                        <div
                            key={`${review.author}-${idx}`}
                            className="review-card"
                        >
                            <div className="review-headerRow">
                                <div className="review-avatar">{review.author.charAt(0)}</div>
                                <div>
                                    <div className="review-author">{review.author}</div>
                                    <div className="review-stars">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} style={{ color: i < review.rating ? "#DAA520" : "#ccc" }}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <span className="review-source">{review.source}</span>
                            </div>
                            <p className="review-text">"{review.text}"</p>
                            <span className="review-time">{review.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
