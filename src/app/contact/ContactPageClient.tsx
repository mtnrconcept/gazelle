"use client";

import { useState, FormEvent } from 'react';
import { PingPongVideo } from '@/components/PingPongVideo';

export function ContactPageClient() {
    const [form, setForm] = useState({
        nom: '',
        email: '',
        telephone: '',
        date: '',
        service: 'diner',
        personnes: '2',
        message: '',
    });
    const [sent, setSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    personnes: Number(form.personnes),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Erreur serveur');
            }

            setSent(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <div className="contact-heroVideoBg">
                    <PingPongVideo src="/images/Caf%C3%A9interior.mp4" />
                    <div className="contact-heroOverlay" />
                </div>
                <div className="contact-heroContent">
                    <p className="contact-heroEyebrow">Réservation en ligne</p>
                    <h1 className="heroPageTitle contact-heroTitle" data-text="Reserver une table a La Gazelle d'Or">Reserver une table a La Gazelle d&apos;Or</h1>
                    <p className="contact-heroTagline">Offrez-vous un voyage culinaire au cœur de l&apos;Afrique</p>
                </div>
            </div>

            <div className="container contact-content">
                <div className="contact-grid">
                    {/* —— Form —— */}
                    <div className="contact-formCol">
                        <div className="contact-promoBanner">
                            <div className="contact-promoGlow" />
                            <span className="contact-promoBadge">Offre Exclusive</span>
                            <h3 className="contact-promoTitle">Du vin genevois offert avec votre commande à emporter</h3>
                            <p className="contact-promoIntro">
                                Pour toute commande à emporter passée directement sur notre site, nous vous offrons une bouteille de vin genevois en cadeau.
                            </p>
                            <div className="contact-promoTiers">
                                <div className="contact-promoTier">
                                    <span className="contact-promoTierAmount">Dès CHF 50.–</span>
                                    <span className="contact-promoTierReward">Bouteille <strong>50cl</strong> offerte</span>
                                </div>
                                <div className="contact-promoTierDivider" />
                                <div className="contact-promoTier contact-promoTier--premium">
                                    <span className="contact-promoTierAmount">Dès CHF 80.–</span>
                                    <span className="contact-promoTierReward">Bouteille <strong>75cl</strong> offerte</span>
                                </div>
                            </div>
                            <p className="contact-promoFooter">
                                Valable uniquement pour les commandes à emporter via notre site
                            </p>
                        </div>

                        <span className="contact-eyebrow">Votre demande</span>
                        <h2 className="gold-sectionTitle contact-sectionTitle" data-text="Formulaire de reservation">Formulaire de reservation</h2>

                        {sent ? (
                            <div className="contact-successCard">
                                <span className="contact-successIcon">✓</span>
                                <h3>Reservation enregistree !</h3>
                                <p>Votre demande a bien été enregistrée. Nous vous confirmerons votre réservation dans les plus brefs délais.</p>
                                <button className="contact-resetBtn" onClick={() => { setSent(false); setForm({ nom: '', email: '', telephone: '', date: '', service: 'diner', personnes: '2', message: '' }); }}>
                                    Nouvelle réservation
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                {error && (
                                    <div style={{ color: '#c0392b', background: '#fdecea', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                                        {error}
                                    </div>
                                )}

                                <div className="contact-row">
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="nom">Nom complet *</label>
                                        <input
                                            id="nom"
                                            name="nom"
                                            type="text"
                                            className="contact-input"
                                            value={form.nom}
                                            onChange={handleChange}
                                            placeholder="Votre nom"
                                            required
                                        />
                                    </div>
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="email">Email *</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="contact-input"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="votre@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="contact-row">
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="telephone">Téléphone *</label>
                                        <input
                                            id="telephone"
                                            name="telephone"
                                            type="tel"
                                            className="contact-input"
                                            value={form.telephone}
                                            onChange={handleChange}
                                            placeholder="+41 __ ___ __ __"
                                            required
                                        />
                                    </div>
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="date">Date souhaitée *</label>
                                        <input
                                            id="date"
                                            name="date"
                                            type="date"
                                            className="contact-input"
                                            value={form.date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="contact-row">
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="service">Service *</label>
                                        <select
                                            id="service"
                                            name="service"
                                            className="contact-select"
                                            value={form.service}
                                            onChange={handleChange}
                                        >
                                            <option value="dejeuner">Déjeuner — 11h30 à 14h30</option>
                                            <option value="diner">Dîner — 18h30 à 22h30</option>
                                        </select>
                                    </div>
                                    <div className="contact-field">
                                        <label className="contact-label" htmlFor="personnes">Nombre de personnes *</label>
                                        <select
                                            id="personnes"
                                            name="personnes"
                                            className="contact-select"
                                            value={form.personnes}
                                            onChange={handleChange}
                                        >
                                            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                                                <option key={n} value={String(n)}>{n} {n === 1 ? 'personne' : 'personnes'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="contact-field">
                                    <label className="contact-label" htmlFor="message">Message & demandes spéciales</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="contact-textarea"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Allergies, régimes particuliers, occasion spéciale, menu dégustation…"
                                        rows={4}
                                    />
                                </div>

                                <button type="submit" className="contact-submitBtn" disabled={submitting}>
                                    {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* —— Info sidebar —— */}
                    <aside className="contact-infoCol">
                        <div className="contact-infoCard">
                            <span className="contact-eyebrow">Contact direct</span>
                            <h3 className="gold-sectionTitleSmall contact-infoTitle" data-text="Informations">Informations</h3>

                            <div className="contact-infoBlock">
                                <p className="contact-infoLabel">Téléphone</p>
                                <a href="tel:+41223403350" className="contact-infoLink">+41 22 340 33 50</a>
                            </div>

                            <div className="contact-infoBlock">
                                <p className="contact-infoLabel">Email</p>
                                <a href="mailto:reservation@lagazelledorgeneva.com" className="contact-infoLink">
                                   reservation@lagazelledorgeneva.com
                                </a>
                            </div>

                            <div className="contact-infoBlock">
                                <p className="contact-infoLabel">Adresse</p>
                                <a
                                    href="https://maps.google.com/?q=Rue+de+Lyon+55+1203+Genève"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-infoLink"
                                >
                                    Rue de Lyon 55<br />1203 Genève
                                </a>
                            </div>

                            <div className="contact-divider"></div>

                            <div className="contact-infoBlock">
                                <p className="contact-infoLabel">Heures d&apos;ouverture</p>
                                <div className="contact-hours">
                                    <div className="contact-hourRow">
                                        <span className="contact-day">Lun – Sam</span>
                                        <span>11h30 – 14h30</span>
                                    </div>
                                    <div className="contact-hourRow">
                                        <span className="contact-day">Lun – Sam</span>
                                        <span>18h30 – 22h30</span>
                                    </div>
                                    <div className="contact-hourRow contact-closed">
                                        <span className="contact-day">Dimanche</span>
                                        <span>Fermé</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-divider"></div>

                            <div className="contact-callBox">
                                <p>Préférez-vous nous appeler directement ?</p>
                                <a href="tel:+41223403350" className="contact-callBtn">
                                    Appeler maintenant
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
