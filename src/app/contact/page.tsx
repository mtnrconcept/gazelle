"use client";

import { useState, FormEvent } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Réservation – ${form.date} – ${form.personnes} pers.`);
        const body = encodeURIComponent(
            `Nom : ${form.nom}\n` +
            `Email : ${form.email}\n` +
            `Téléphone : ${form.telephone}\n` +
            `Date souhaitée : ${form.date}\n` +
            `Service : ${form.service === 'dejeuner' ? 'Déjeuner (11h30–14h30)' : 'Dîner (18h30–22h30)'}\n` +
            `Nombre de personnes : ${form.personnes}\n\n` +
            `Message :\n${form.message}`
        );
        window.location.href = `mailto:lagazelledorgeneva@gmail.com?subject=${subject}&body=${body}`;
        setSent(true);
    };

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.heroEyebrow}>Réservation en ligne</p>
                    <h1 className={styles.heroTitle}>Réserver une table</h1>
                    <p className={styles.heroTagline}>Offrez-vous un voyage culinaire au cœur de l'Afrique</p>
                </div>
            </div>

            <div className={`container ${styles.content}`}>
                <div className={styles.grid}>

                    {/* ── Form ── */}
                    <div className={styles.formCol}>
                        <span className={styles.eyebrow}>Votre demande</span>
                        <h2 className={styles.sectionTitle}>Formulaire de réservation</h2>

                        {sent ? (
                            <div className={styles.successCard}>
                                <span className={styles.successIcon}>✓</span>
                                <h3>Demande envoyée !</h3>
                                <p>Votre messagerie s'est ouverte avec les détails pré-remplis. Nous vous confirmerons votre réservation dans les plus brefs délais.</p>
                                <button className={styles.resetBtn} onClick={() => setSent(false)}>
                                    Nouvelle réservation
                                </button>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="nom">Nom complet *</label>
                                        <input
                                            id="nom"
                                            name="nom"
                                            type="text"
                                            className={styles.input}
                                            value={form.nom}
                                            onChange={handleChange}
                                            placeholder="Votre nom"
                                            required
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="email">Email *</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className={styles.input}
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="votre@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="telephone">Téléphone</label>
                                        <input
                                            id="telephone"
                                            name="telephone"
                                            type="tel"
                                            className={styles.input}
                                            value={form.telephone}
                                            onChange={handleChange}
                                            placeholder="+41 __ ___ __ __"
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="date">Date souhaitée *</label>
                                        <input
                                            id="date"
                                            name="date"
                                            type="date"
                                            className={styles.input}
                                            value={form.date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="service">Service *</label>
                                        <select
                                            id="service"
                                            name="service"
                                            className={styles.select}
                                            value={form.service}
                                            onChange={handleChange}
                                        >
                                            <option value="dejeuner">Déjeuner — 11h30 à 14h30</option>
                                            <option value="diner">Dîner — 18h30 à 22h30</option>
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="personnes">Nombre de personnes *</label>
                                        <select
                                            id="personnes"
                                            name="personnes"
                                            className={styles.select}
                                            value={form.personnes}
                                            onChange={handleChange}
                                        >
                                            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                                                <option key={n} value={String(n)}>{n} {n === 1 ? 'personne' : 'personnes'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label} htmlFor="message">Message & demandes spéciales</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className={styles.textarea}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Allergies, régimes particuliers, occasion spéciale, menu degustation…"
                                        rows={4}
                                    />
                                </div>

                                <button type="submit" className={styles.submitBtn}>
                                    Envoyer ma demande
                                </button>
                            </form>
                        )}
                    </div>

                    {/* ── Info sidebar ── */}
                    <aside className={styles.infoCol}>
                        <div className={styles.infoCard}>
                            <span className={styles.eyebrow}>Contact direct</span>
                            <h3 className={styles.infoTitle}>Informations</h3>

                            <div className={styles.infoBlock}>
                                <p className={styles.infoLabel}>Téléphone</p>
                                <a href="tel:+41223403350" className={styles.infoLink}>+41 22 340 33 50</a>
                            </div>

                            <div className={styles.infoBlock}>
                                <p className={styles.infoLabel}>Email</p>
                                <a href="mailto:lagazelledorgeneva@gmail.com" className={styles.infoLink}>
                                    lagazelledorgeneva@gmail.com
                                </a>
                            </div>

                            <div className={styles.infoBlock}>
                                <p className={styles.infoLabel}>Adresse</p>
                                <a
                                    href="https://maps.google.com/?q=Rue+de+Lyon+55+1203+Genève"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.infoLink}
                                >
                                    Rue de Lyon 55<br />1203 Genève
                                </a>
                            </div>

                            <div className={styles.divider}></div>

                            <div className={styles.infoBlock}>
                                <p className={styles.infoLabel}>Heures d'ouverture</p>
                                <div className={styles.hours}>
                                    <div className={styles.hourRow}>
                                        <span className={styles.day}>Lun – Sam</span>
                                        <span>11h30 – 14h30</span>
                                    </div>
                                    <div className={styles.hourRow}>
                                        <span className={styles.day}>Lun – Sam</span>
                                        <span>18h30 – 22h30</span>
                                    </div>
                                    <div className={`${styles.hourRow} ${styles.closed}`}>
                                        <span className={styles.day}>Dimanche</span>
                                        <span>Fermé</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.divider}></div>

                            <div className={styles.callBox}>
                                <p>Préférez-vous nous appeler directement ?</p>
                                <a href="tel:+41223403350" className={styles.callBtn}>
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
