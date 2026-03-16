"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/reservations', label: 'Réservations' },
    { href: '/admin/menu', label: 'Menu' },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    return (
        <aside style={{
            width: '220px',
            minHeight: '100vh',
            background: '#3a2819',
            color: '#fff',
            padding: '1.5rem 0',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
        }}>
            <div style={{ padding: '0 1.25rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>La Gazelle d&apos;Or</h2>
                <p style={{ fontSize: '0.75rem', color: '#d9a24f', marginTop: '0.25rem' }}>Administration</p>
            </div>

            <nav style={{ flex: 1 }}>
                {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: 'block',
                                padding: '0.75rem 1.25rem',
                                color: active ? '#d9a24f' : '#ccc',
                                background: active ? 'rgba(217,162,79,0.1)' : 'transparent',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: active ? 600 : 400,
                                borderLeft: active ? '3px solid #d9a24f' : '3px solid transparent',
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={handleLogout}
                style={{
                    margin: '1rem 1.25rem',
                    padding: '0.625rem',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ccc',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                }}
            >
                Déconnexion
            </button>
        </aside>
    );
}
