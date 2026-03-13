import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [totalReservations, todayReservations, pendingReservations, menuSections] = await Promise.all([
        prisma.reservation.count(),
        prisma.reservation.count({ where: { date: { gte: today, lt: tomorrow } } }),
        prisma.reservation.count({ where: { status: 'pending' } }),
        prisma.menuSection.count({ where: { parentId: null } }),
    ]);

    const stats = [
        { label: 'Réservations totales', value: totalReservations },
        { label: "Aujourd'hui", value: todayReservations },
        { label: 'En attente', value: pendingReservations },
        { label: 'Catégories menu', value: menuSections },
    ];

    return (
        <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#3a2819' }}>Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {stats.map((stat) => (
                    <div key={stat.label} style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
                        <p style={{ fontSize: '2rem', fontWeight: 700, color: '#3a2819' }}>{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
