"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        fetch('/api/admin/session')
            .then((res) => {
                if (!res.ok) {
                    router.replace('/admin/login');
                } else {
                    setChecked(true);
                }
            })
            .catch(() => router.replace('/admin/login'));
    }, [router]);

    if (!checked) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
                <p style={{ color: '#888' }}>Chargement…</p>
            </div>
        );
    }

    return <>{children}</>;
}
