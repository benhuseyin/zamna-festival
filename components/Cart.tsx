'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';

export default function Cart() {
    const t = useTranslations('cart');
    const locale = useLocale();
    const router = useRouter();
    const { items, subtotal, serviceFee, total, isOpen, closeCart, removeItem, updateQuantity } = useCart();

    const handleCheckout = () => {
        closeCart();
        router.push(`/${locale}/checkout`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Slide-over panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-black border-l border-glass-border z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-glass-border glass-strong">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-white" />
                                <h2 className="text-2xl font-bold">{t('title')}</h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
                                    <p className="text-white/60 text-lg">{t('empty')}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            className="glass rounded-lg p-4"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold mb-1">{item.name}</h3>
                                                    <p className="text-sm text-white/60">
                                                        {formatPrice(item.price)} × {item.quantity}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
                                                    aria-label={t('remove')}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 glass rounded-lg px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-sm"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 rounded bg-accent hover:bg-accent/90 transition-all flex items-center justify-center text-sm text-black"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <p className="font-bold text-accent">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer with totals */}
                        {items.length > 0 && (
                            <div className="border-t border-glass-border glass-strong p-6 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-white/80">
                                        <span>{t('subtotal')}</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-white/80 text-sm">
                                        <span>{t('serviceFee')} (10%)</span>
                                        <span>{formatPrice(serviceFee)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold pt-2 border-t border-glass-border">
                                        <span>{t('total')}</span>
                                        <span className="text-accent">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full btn-primary py-4 text-lg"
                                >
                                    {t('checkout')}
                                </button>

                                <button
                                    onClick={closeCart}
                                    className="w-full btn-secondary py-3"
                                >
                                    {t('continueShopping')}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
