import DashboardLayout from '@/components/admin/layouts/DashboardLayout';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Admin Dashboard - PakSoft',
    description: 'PakSoft Admin Dashboard',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Server-side auth check (middleware also checks, this is defense in depth)
    const authenticated = await isAuthenticated();

    if (!authenticated) {
        redirect('/admin/login');
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}
