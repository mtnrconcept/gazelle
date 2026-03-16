export function OrderBanner() {
    return (
        <section className="order-section panel reveal" data-reveal="up">
            <div className="container order-container">
                <p className="order-eyebrow">Livraison</p>
                <h2 className="gold-sectionTitleMedium order-title" data-text="Commandez en livraison">Commandez en livraison</h2>
                <p className="order-subtitle">
                    Savourez nos plats chez vous via nos partenaires de livraison
                </p>
                <div className="order-links">
                    <a
                        href="https://www.ubereats.com/store/la-gazelle-dor/ZyYBaGTYWA6WDQYUbQveaA?diningMode=DELIVERY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="order-platformBtn"
                    >
                        Uber Eats
                    </a>
                    <a
                        href="https://www.smood.ch/fr/store/la-gazelle-dor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="order-platformBtn"
                    >
                        Smood
                    </a>
                    <a
                        href="https://www.just-eat.ch/fr/menu/gazelle-dor-african-village#pre-order"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="order-platformBtn"
                    >
                        Just Eat
                    </a>
                </div>
            </div>
        </section>
    );
}
