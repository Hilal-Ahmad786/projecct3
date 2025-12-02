'use client';

import { useSectionTranslations } from '@/hooks/useTranslations';

export default function TestPage() {
    const t = useSectionTranslations('webDevelopment.hero');

    return (
        <div className="p-8">
            <h1>Translation Test</h1>
            <p>Title: {t('title')}</p>
            <p>Title Accent: {t('titleAccent')}</p>
            <p>Description: {t('description')}</p>
        </div>
    );
}
