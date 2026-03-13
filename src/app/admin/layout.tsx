import { AdminGuard } from './components/AdminGuard';
import { AdminSidebar } from './components/AdminSidebar';

export const metadata = {
    title: 'Admin — La Gazelle d\'Or',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminGuard>
            <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', background: '#f8f8f8' }}>
                <AdminSidebar />
                <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
                    {children}
                </main>
            </div>
        </AdminGuard>
    );
}
