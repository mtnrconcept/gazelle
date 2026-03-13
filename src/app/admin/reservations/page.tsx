"use client";

import { useEffect, useState, useCallback } from 'react';

type Reservation = {
    id: number;
    nom: string;
    email: string;
    telephone: string | null;
    date: string;
    service: string;
    personnes: number;
    message: string | null;
    status: string;
    createdAt: string;
};

const statusColors: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#fef3cd', color: '#856404' },
    confirmed: { bg: '#d4edda', color: '#155724' },
    cancelled: { bg: '#f8d7da', color: '#721c24' },
};

const statusLabels: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    cancelled: 'Annulée',
};

export default function AdminReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchReservations = useCallback(async () => {
        setLoading(true);
        const params = filter ? `?status=${filter}` : '';
        const res = await fetch(`/api/admin/reservations${params}`);
        const data = await res.json();
        setReservations(data);
        setLoading(false);
    }, [filter]);

    useEffect(() => { fetchReservations(); }, [fetchReservations]);

    const updateStatus = async (id: number, status: string) => {
        await fetch(`/api/admin/reservations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        fetchReservations();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3a2819' }}>Réservations</h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['', 'pending', 'confirmed', 'cancelled'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #ddd',
                                background: filter === f ? '#3a2819' : '#fff',
                                color: filter === f ? '#fff' : '#333',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                            }}
                        >
                            {f === '' ? 'Toutes' : statusLabels[f]}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <p style={{ color: '#888' }}>Chargement…</p>
            ) : reservations.length === 0 ? (
                <p style={{ color: '#888' }}>Aucune réservation trouvée.</p>
            ) : (
                <div style={{ background: '#fff', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ background: '#fafafa', textAlign: 'left' }}>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Date</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Nom</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Service</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Pers.</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Contact</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Statut</th>
                                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((r) => {
                                const sc = statusColors[r.status] || statusColors.pending;
                                return (
                                    <tr key={r.id} style={{ borderTop: '1px solid #eee' }}>
                                        <td style={{ padding: '0.75rem 1rem' }}>{new Date(r.date).toLocaleDateString('fr-CH')}</td>
                                        <td style={{ padding: '0.75rem 1rem' }}>
                                            <strong>{r.nom}</strong>
                                            {r.message && <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>{r.message}</p>}
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem' }}>{r.service === 'dejeuner' ? 'Déjeuner' : 'Dîner'}</td>
                                        <td style={{ padding: '0.75rem 1rem' }}>{r.personnes}</td>
                                        <td style={{ padding: '0.75rem 1rem' }}>
                                            <div>{r.email}</div>
                                            {r.telephone && <div style={{ fontSize: '0.75rem', color: '#888' }}>{r.telephone}</div>}
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem' }}>
                                            <span style={{ padding: '0.25rem 0.625rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600, background: sc.bg, color: sc.color }}>
                                                {statusLabels[r.status] || r.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.375rem' }}>
                                                {r.status !== 'confirmed' && (
                                                    <button onClick={() => updateStatus(r.id, 'confirmed')} style={{ padding: '0.375rem 0.625rem', fontSize: '0.75rem', background: '#d4edda', color: '#155724', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                                                        Confirmer
                                                    </button>
                                                )}
                                                {r.status !== 'cancelled' && (
                                                    <button onClick={() => updateStatus(r.id, 'cancelled')} style={{ padding: '0.375rem 0.625rem', fontSize: '0.75rem', background: '#f8d7da', color: '#721c24', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                                                        Annuler
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
