'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        // Remove current locale from pathname
        const pathWithoutLocale = pathname.replace(/^\/(tr|en)/, '');
        // Navigate to new locale
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    return (
        <div className="flex items-center space-x-2 glass rounded-lg px-3 py-2">
            <Globe className="w-4 h-4 text-white" />
            <button
                onClick={() => switchLocale('tr')}
                className={`text-sm font-medium transition-colors ${locale === 'tr' ? 'text-accent' : 'text-white/60 hover:text-white'
                    }`}
            >
                TR
            </button>
            <span className="text-white/30">|</span>
            <button
                onClick={() => switchLocale('en')}
                className={`text-sm font-medium transition-colors ${locale === 'en' ? 'text-accent' : 'text-white/60 hover:text-white'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
