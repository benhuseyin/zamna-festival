'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('footer');

    return (
        <footer className="border-t border-glass-border glass py-8">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
                    <p>{t('rights')}</p>
                    <p>{t('organizer')}</p>
                </div>
            </div>
        </footer>
    );
}
