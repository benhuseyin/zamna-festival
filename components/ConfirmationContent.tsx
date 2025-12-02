'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle2, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';

export default function ConfirmationContent() {
    const t = useTranslations('confirmation');
    const locale = useLocale();
    const router = useRouter();
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('orderData');
        if (stored) {
            setOrderData(JSON.parse(stored));
            // Clear after reading
            sessionStorage.removeItem('orderData');
        } else {
            // Redirect to home if no order data
            router.push(`/${locale}`);
        }
    }, [locale, router]);

    if (!orderData) {
        return null;
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-black text-white py-24">
                <div className="container-custom max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-block mb-6"
                        >
                            <CheckCircle2 className="w-24 h-24 text-green-500" />
                        </motion.div>

                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-white/80">{t('thankYou')}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-strong rounded-2xl p-8 md:p-12 mb-8"
                    >
                        <div className="mb-8 pb-8 border-b border-glass-border">
                            <p className="text-sm text-white/60 mb-2">{t('orderNumber')}</p>
                            <p className="text-2xl font-bold text-white font-mono">{orderData.orderId}</p>
                        </div>

                        <div className="space-y-6 mb-8">
                            <div>
                                <p className="text-sm text-white/60 mb-1">Ad Soyad / Name</p>
                                <p className="font-semibold">{orderData.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-white/60 mb-1">E-posta / Email</p>
                                <p className="font-semibold">{orderData.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-white/60 mb-1">Telefon / Phone</p>
                                <p className="font-semibold">{orderData.phone}</p>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-glass-border">
                            <h2 className="font-bold text-xl mb-4">Biletler / Tickets</h2>
                            <div className="space-y-3 mb-6">
                                {orderData.items.map((item: any) => (
                                    <div key={item.id} className="flex justify-between items-center glass rounded-lg p-4">
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-white/60">
                                                {formatPrice(item.price)} × {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-bold text-white">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 pt-4 border-t border-glass-border">
                                <div className="flex justify-between text-white/80">
                                    <span>Ara Toplam / Subtotal</span>
                                    <span>{formatPrice(orderData.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-white/80 text-sm">
                                    <span>Hizmet Bedeli / Service Fee</span>
                                    <span>{formatPrice(orderData.serviceFee)}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-bold pt-3 border-t border-glass-border">
                                    <span>Toplam / Total</span>
                                    <span className="text-white">{formatPrice(orderData.total)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 glass rounded-lg">
                            <p className="text-sm text-white/80 text-center">
                                {t('emailSent')}
                            </p>
                        </div>
                    </motion.div>

                    <div className="text-center">
                        <button
                            onClick={() => router.push(`/${locale}`)}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            {t('backToHome')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
