'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, TicketType } from './types';

interface CartContextType {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    serviceFee: number;
    total: number;
    addItem: (ticket: TicketType, quantity: number) => void;
    removeItem: (ticketId: string) => void;
    updateQuantity: (ticketId: string, quantity: number) => void;
    clearCart: () => void;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'zamna-cart';
const SERVICE_FEE_PERCENTAGE = 0.10; // 10% service fee

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse cart from localStorage', e);
            }
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isHydrated]);

    const addItem = (ticket: TicketType, quantity: number) => {
        if (quantity <= 0) return;

        setItems((prev) => {
            const existingItem = prev.find((item) => item.id === ticket.id);

            if (existingItem) {
                return prev.map((item) =>
                    item.id === ticket.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { ...ticket, quantity }];
        });
    };

    const removeItem = (ticketId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== ticketId));
    };

    const updateQuantity = (ticketId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(ticketId);
            return;
        }

        setItems((prev) =>
            prev.map((item) =>
                item.id === ticketId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const serviceFee = subtotal * SERVICE_FEE_PERCENTAGE;
    const total = subtotal + serviceFee;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                itemCount,
                subtotal,
                serviceFee,
                total,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isOpen,
                openCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
