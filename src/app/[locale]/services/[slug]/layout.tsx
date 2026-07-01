import { ReactNode } from 'react';
import ServiceSubNavServer from '@/components/services/ServiceSubNavServer';

interface ServiceLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}

// Shared shell for a service page and all its subpages: the sticky sub-nav
// (Overview / Features / Technologies / Process / Pricing / FAQ / Blog).
export default async function ServiceLayout({ children, params }: ServiceLayoutProps) {
  const { locale, slug } = await params;
  return (
    <>
      <ServiceSubNavServer slug={slug} locale={locale} />
      {children}
    </>
  );
}
