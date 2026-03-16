"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Erreur de connexion');
            }

            router.push('/admin');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', color: '#3a2819' }}>Administration</h1>
                <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>La Gazelle d&apos;Or</p>

                {error && (
                    <div style={{ color: '#c0392b', background: '#fdecea', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.375rem', fontSize: '0.875rem' }}>Identifiant</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.9rem', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.375rem', fontSize: '0.875rem' }}>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '0.9rem', boxSizing: 'border-box' }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', padding: '0.75rem', background: '#b86a2c', color: '#fff', border: 'none', borderRadius: '0.5rem', fontSize: '0.95rem', fontWeight: 600, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Connexion…' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
}
