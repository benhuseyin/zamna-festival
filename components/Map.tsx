'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Calendar } from 'lucide-react';

export default function Map() {
    const t = useTranslations('location');

    return (
        <section id="location" className="section-padding">
            <div className="container-custom">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
                    {t('title')}
                </h2>

                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden">
                        {/* Map iframe */}
                        <div className="h-[450px] md:h-auto md:aspect-video w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2976666666665!2d29.0!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOcKwMDAnMDAuMCJF!5e0!3m2!1sen!2str!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale"
                                title="Life Park Istanbul Location"
                            />
                        </div>

                        {/* Overlay card */}
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 glass-strong rounded-xl p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-xl mb-1">{t('venue')}</h3>
                                        <p className="text-white/80">{t('address')}</p>
                                        <p className="text-white font-semibold">{t('city')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 md:border-l md:border-glass-border md:pl-6">
                                    <Calendar className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm text-white/60 mb-1">Tarih / Date</p>
                                        <p className="font-semibold">{t('dates')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
