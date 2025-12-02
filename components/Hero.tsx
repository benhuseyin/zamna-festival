'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HeroImage from '@/assets/images/hero.jpeg';

export default function Hero() {
    const t = useTranslations('hero');
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={HeroImage}
                    alt="ZAMNA x MO Homecoming 2026"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom py-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Glass Card */}
                    <div className="glass-strong rounded-2xl p-8 md:p-12 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient"
                        >
                            {t('title')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
                        >
                            {t('subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <button
                                onClick={() => scrollToSection('tickets')}
                                className="btn-primary text-lg px-8 py-4"
                            >
                                {t('ctaPrimary')}
                            </button>
                            <button
                                onClick={() => scrollToSection('location')}
                                className="btn-secondary text-lg px-8 py-4"
                            >
                                {t('ctaSecondary')}
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    );
}
