import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { CartProvider } from '@/lib/cart-context';

const locales = ['tr', 'en'];

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: ReactNode;
    params: { locale: string };
}) {
    // Validate locale
    if (!locales.includes(locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <CartProvider>
                {children}
            </CartProvider>
        </NextIntlClientProvider>
    );
}
