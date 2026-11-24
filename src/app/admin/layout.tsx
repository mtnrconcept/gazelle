import type { Metadata } from 'next';
import { AdminGuard } from './components/AdminGuard';
import { AdminSidebar } from './components/AdminSidebar';

export const metadata: Metadata = {
    title: "Admin — La Gazelle d'Or",
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminGuard>
            <div className="admin-layout-shell" style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', background: '#f8f8f8' }}>
                <AdminSidebar />
                <main className="admin-layout-main" style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
                    {children}
                </main>
            </div>
        </AdminGuard>
    );
}
