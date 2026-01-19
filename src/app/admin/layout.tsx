import DashboardLayout from '@/components/admin/layouts/DashboardLayout';

export const metadata = {
    title: 'Admin Dashboard - PakSoft',
    description: 'PakSoft Admin Dashboard',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
