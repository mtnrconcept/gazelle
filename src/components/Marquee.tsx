const items = [
    'Injera maison',
    'Rituel du cafe',
    'Epices traditionnelles',
    'Partage convivial',
    'Cuisine erythreenne',
    'Saveurs ethiopiennes'
];

export function Marquee() {
    const text = items.join(' · ');

    return (
        <section className="marquee-section reveal" data-reveal="up">
            <div className="container marquee-container">
                <div className="marquee-root" aria-hidden="true">
                    <div className="marquee-track">
                        <span>{text}</span>
                        <span>{text}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
