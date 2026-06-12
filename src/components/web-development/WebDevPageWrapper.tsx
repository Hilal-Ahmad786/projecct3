'use client';

import WebDevHero from './WebDevHero';

interface Props {
  serviceName: string;
  description: string;
  locale: string;
}

export default function WebDevPageWrapper({ serviceName, description }: Props) {
  return <WebDevHero serviceName={serviceName} description={description} />;
}
