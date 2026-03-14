import Link from 'next/link';

export function ReserveSection() {
    return (
        <section id="contact" className="reserve-section panel decoratedSection reveal" data-reveal="up">
            <div className="container reserve-container">
                <div className="reserve-card">
                    <p className="reserve-eyebrow">Réservation</p>
                    <h2 className="gold-sectionTitle reserve-title" data-text="Une table vous attend">Une table vous attend</h2>
                    <p className="reserve-subtitle">
                        Offrez-vous un moment hors du temps. Service attentionné, atmosphère feutrée et cuisine traditionnelle.
                    </p>
                    <div className="reserve-actions">
                        <a href="tel:+41223403350" className="reserve-primaryButton">Réserver par téléphone</a>
                        <Link href="/contact" className="reserve-secondaryButton">
                            Réserver en ligne
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
