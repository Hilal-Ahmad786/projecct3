// Legacy URL — the canonical technologies page lives at /technologies
// (which the service sub-nav links to). Permanent redirect for SEO.

import { redirect } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export default async function TechStackRedirect({ params }: PageProps) {
  const { slug, locale } = await params;
  redirect(`/${locale}${localizeFullPath(`/services/${slug}/technologies`, locale)}`);
}
