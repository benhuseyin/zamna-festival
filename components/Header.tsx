'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import LanguageToggle from './LanguageToggle';

export default function Header() {
    const t = useTranslations('nav');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { itemCount, openCart } = useCart();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img
                            src="https://framerusercontent.com/images/PMXUAn8KJp94MFNoMgEVJdauDc.svg?width=202&height=78"
                            alt="ZAMNA x MO"
                            width={151}
                            height={58}
                            className="h-12 w-auto"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection('home')}
                            className="text-sm font-medium hover:text-accent transition-colors"
                        >
                            {t('home')}
                        </button>
                        <button
                            onClick={() => scrollToSection('tickets')}
                            className="text-sm font-medium hover:text-accent transition-colors"
                        >
                            {t('tickets')}
                        </button>
                        <button
                            onClick={() => scrollToSection('lineup')}
                            className="text-sm font-medium hover:text-accent transition-colors"
                        >
                            {t('lineup')}
                        </button>
                        <button
                            onClick={() => scrollToSection('info')}
                            className="text-sm font-medium hover:text-accent transition-colors"
                        >
                            {t('info')}
                        </button>
                    </nav>

                    {/* Right side: Language Toggle, Cart, CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <LanguageToggle />

                        {/* <button
                            onClick={openCart}
                            className="relative p-2 hover:text-accent transition-colors"
                            aria-label="Shopping cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                    {itemCount}
                                </span>
                            )}
                        </button> */}

                        <button
                            onClick={() => scrollToSection('tickets')}
                            className="btn-primary"
                        >
                            {t('buy')}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        {/* <button
                            onClick={openCart}
                            className="relative p-2 hover:text-accent transition-colors"
                            aria-label="Shopping cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                    {itemCount}
                                </span>
                            )}
                        </button> */}

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 hover:text-accent transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass-strong border-t border-glass-border animate-fade-in">
                    <div className="container-custom py-6 space-y-4">
                        <button
                            onClick={() => scrollToSection('home')}
                            className="block w-full text-left py-2 text-lg font-medium hover:text-accent transition-colors"
                        >
                            {t('home')}
                        </button>
                        <button
                            onClick={() => scrollToSection('tickets')}
                            className="block w-full text-left py-2 text-lg font-medium hover:text-accent transition-colors"
                        >
                            {t('tickets')}
                        </button>
                        <button
                            onClick={() => scrollToSection('lineup')}
                            className="block w-full text-left py-2 text-lg font-medium hover:text-accent transition-colors"
                        >
                            {t('lineup')}
                        </button>
                        <button
                            onClick={() => scrollToSection('info')}
                            className="block w-full text-left py-2 text-lg font-medium hover:text-accent transition-colors"
                        >
                            {t('info')}
                        </button>

                        <div className="pt-4 border-t border-glass-border w-fit">
                            <LanguageToggle />
                        </div>

                        <button
                            onClick={() => {
                                scrollToSection('tickets');
                                setMobileMenuOpen(false);
                            }}
                            className="btn-primary w-full"
                        >
                            {t('buy')}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
