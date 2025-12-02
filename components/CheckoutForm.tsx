'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice, generateOrderId } from '@/lib/utils';

export default function CheckoutForm() {
    const t = useTranslations('checkout');
    const locale = useLocale();
    const router = useRouter();
    const { items, subtotal, serviceFee, total, clearCart } = useCart();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            phone: '',
        };

        if (!formData.name.trim()) {
            newErrors.name = t('required');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('invalidEmail');
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('required');
        } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
            newErrors.phone = t('invalidPhone');
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== '');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate order ID
        const orderId = generateOrderId();

        // Store order data in sessionStorage for confirmation page
        sessionStorage.setItem(
            'orderData',
            JSON.stringify({
                orderId,
                ...formData,
                items,
                subtotal,
                serviceFee,
                total,
            })
        );

        // Clear cart
        clearCart();

        // Navigate to confirmation
        router.push(`/${locale}/confirmation`);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Sepetiniz boş / Your cart is empty</h1>
                    <button
                        onClick={() => router.push(`/${locale}`)}
                        className="btn-primary"
                    >
                        Ana Sayfaya Dön / Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-24">
            <div className="container-custom max-w-6xl">
                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Geri / Back
                </button>

                <h1 className="font-display text-3xl md:text-4xl font-bold mb-12 text-gradient">
                    {t('title')}
                </h1>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="glass-strong rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold mb-6">{t('personalInfo')}</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    {t('name')} *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass border border-glass-border focus:border-accent focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    {t('email')} *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass border border-glass-border focus:border-accent focus:outline-none transition-colors"
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                    {t('phone')} *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg glass border border-glass-border focus:border-accent focus:outline-none transition-colors"
                                    placeholder="+90 555 123 4567"
                                />
                                {errors.phone && (
                                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            <div className="pt-4">
                                <h3 className="text-sm font-medium mb-3">{t('paymentMethod')}</h3>
                                <div className="glass rounded-lg p-4 flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-white" />
                                    <span>{t('creditCard')}</span>
                                    <span className="ml-auto text-sm text-white/60">(Mock)</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${isSubmitting
                                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                                    : 'bg-accent text-black hover:bg-accent/90 hover:scale-105 active:scale-95'
                                    }`}
                            >
                                {isSubmitting ? 'İşleniyor... / Processing...' : t('completeOrder')}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="glass-strong rounded-2xl p-6 md:p-8 h-fit">
                        <h2 className="text-xl font-bold mb-6">{t('orderSummary')}</h2>

                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-start pb-4 border-b border-glass-border">
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-white/60">
                                            {formatPrice(item.price)} × {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-accent">
                                        {formatPrice(item.price * item.quantity)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-glass-border">
                            <div className="flex justify-between text-white/80">
                                <span>Ara Toplam / Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-white/80 text-sm">
                                <span>Hizmet Bedeli / Service Fee (10%)</span>
                                <span>{formatPrice(serviceFee)}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold pt-3 border-t border-glass-border">
                                <span>Toplam / Total</span>
                                <span className="text-accent">{formatPrice(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
