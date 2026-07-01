import { ReactNode } from 'react';
import ServiceSubNavServer from '@/components/services/ServiceSubNavServer';

interface WebDevLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// web-development has a dedicated route folder, so it gets the same sticky
// service sub-nav via its own layout (the [slug] layout does not apply here).
export default async function WebDevelopmentLayout({ children, params }: WebDevLayoutProps) {
  const { locale } = await params;
  return (
    <>
      <ServiceSubNavServer slug="web-development" locale={locale} />
      {children}
    </>
  );
}
