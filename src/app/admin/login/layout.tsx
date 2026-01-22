// src/app/admin/login/layout.tsx
// Separate layout for login page (no dashboard wrapper)

export const metadata = {
    title: 'Admin Login - PakSoft',
    description: 'Login to PakSoft Admin Dashboard',
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

export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
