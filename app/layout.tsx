import { Inter, Outfit } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

export const metadata = {
    title: 'ZAMNA x MO Homecoming 2026 | Life Park Istanbul',
    description: 'Mahmut Orhan\'s 2026 homecoming project brings together the phenomenal Zamna Festival from Mexico at Istanbul Life Park on June 6-7. Get your tickets now!',
    keywords: 'ZAMNA, Mahmut Orhan, festival, Istanbul, Life Park, electronic music, Zamna Festival',
    openGraph: {
        title: 'ZAMNA x MO Homecoming 2026',
        description: 'June 6-7, 2026 at Life Park Istanbul',
        type: 'website',
        images: [
            {
                url: 'https://cdn.iticket.com.tr/event/poster_square/uXpHPlV4kaHPnDUV9492t4ER2nkIg4RTTy1bCCPY.webp',
                width: 1200,
                height: 1200,
                alt: 'ZAMNA x MO Homecoming 2026',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ZAMNA x MO Homecoming 2026',
        description: 'June 6-7, 2026 at Life Park Istanbul',
    },
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="tr" className={`${inter.variable} ${outfit.variable}`}>
            <body className="font-sans">{children}</body>
        </html>
    );
}
