'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { TICKET_TYPES } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function TicketSelector() {
    const t = useTranslations('tickets');
    const { addItem, openCart } = useCart();

    const [quantities, setQuantities] = useState({
        'dance-floor': 0,
        'backstage': 0,
        'vip': 0,
    });

    const updateQuantity = (ticketId: string, delta: number) => {
        setQuantities((prev) => ({
            ...prev,
            [ticketId]: Math.max(0, prev[ticketId as keyof typeof prev] + delta),
        }));
    };

    const handleAddToCart = () => {
        let itemsAdded = 0;

        TICKET_TYPES.forEach((ticket) => {
            const quantity = quantities[ticket.id as keyof typeof quantities];
            if (quantity > 0) {
                addItem(ticket, quantity);
                itemsAdded += quantity;
            }
        });

        if (itemsAdded > 0) {
            // Reset quantities
            setQuantities({
                'dance-floor': 0,
                'backstage': 0,
                'vip': 0,
            });
            // Open cart
            openCart();
        }
    };

    const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
    const subtotal = TICKET_TYPES.reduce((sum, ticket) => {
        const quantity = quantities[ticket.id as keyof typeof quantities];
        return sum + ticket.price * quantity;
    }, 0);

    return (
        <section id="tickets" className="section-padding bg-black">
            <div className="container-custom">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
                    {t('title')}
                </h2>

                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Event Summary Card */}
                    <div className="glass-strong rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold mb-4">{t('eventName')}</h3>
                        <div className="space-y-3 text-white/90">
                            <p className="text-lg">{t('venue')}</p>
                            <div>
                                <p className="text-sm text-white/60 mb-1">{t('dateLabel')}</p>
                                <p className="font-semibold">{t('dateValue')}</p>
                            </div>
                            <div>
                                <p className="text-sm text-white/60 mb-1">{t('priceLabel')}</p>
                                <p className="font-semibold text-accent">{t('priceRange')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Selection */}
                    <div className="glass-strong rounded-2xl p-6 md:p-8">
                        <div className="space-y-6">
                            {/* Dance Floor */}
                            <TicketRow
                                label={t('danceFloor')}
                                price={2500}
                                quantity={quantities['dance-floor']}
                                onIncrement={() => updateQuantity('dance-floor', 1)}
                                onDecrement={() => updateQuantity('dance-floor', -1)}
                            />

                            {/* Backstage */}
                            <TicketRow
                                label={t('backstage')}
                                price={5000}
                                quantity={quantities['backstage']}
                                onIncrement={() => updateQuantity('backstage', 1)}
                                onDecrement={() => updateQuantity('backstage', -1)}
                            />

                            {/* VIP */}
                            <TicketRow
                                label={t('vip')}
                                price={10000}
                                quantity={quantities['vip']}
                                onIncrement={() => updateQuantity('vip', 1)}
                                onDecrement={() => updateQuantity('vip', -1)}
                            />
                        </div>

                        {/* Subtotal and Add to Cart */}
                        <div className="mt-8 pt-6 border-t border-glass-border">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-semibold">{t('subtotal')}</span>
                                <span className="text-2xl font-bold text-accent">
                                    {formatPrice(subtotal)}
                                </span>
                            </div>
                            {totalItems === 0 && (
                                <p className="text-[#fd0] text-center mb-5">{t('selectTickets')}</p>
                            )}
                            <button
                                disabled={totalItems === 0}
                                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${totalItems > 0
                                    ? 'bg-[#fd0] text-black backdrop-blur-md border border-white/20 shadow-lg hover:scale-105 active:scale-95'
                                    : 'bg-black/10 text-white/40 cursor-not-allowed'
                                    }`}
                            >
                                {t('addToCart')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface TicketRowProps {
    label: string;
    price: number;
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

function TicketRow({ label, price, quantity, onIncrement, onDecrement }: TicketRowProps) {
    const t = useTranslations('tickets');

    return (
        <div className="glass rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{label}</h4>
                    <p className="text-sm text-white/60">
                        {t('unitPrice')}: {formatPrice(price)}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 glass rounded-lg px-3 py-2">
                        <button
                            onClick={onDecrement}
                            disabled={quantity === 0}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{quantity}</span>
                        <button
                            onClick={onIncrement}
                            className="w-8 h-8 rounded-full bg-accent hover:bg-accent/90 transition-all flex items-center justify-center !bg-[#fd0]"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-4 h-4 text-black" />
                        </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                        <p className="text-sm text-white/60">{t('subtotal')}</p>
                        <p className="font-bold text-accent">{formatPrice(price * quantity)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
