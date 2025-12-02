'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
    const t = useTranslations('about');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const content = t('content');
    const sections = content.split('\n\n');

    return (
        <section ref={ref} className="section-padding" id='about'>
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
                        {t('title')}
                    </h2>

                    <div className="glass-strong rounded-2xl p-8 md:p-12">
                        <div className="prose prose-invert max-w-none space-y-6">
                            {sections.map((section, index) => {
                                const lines = section.split('\n');
                                const isHeading = lines[0].length < 100 && !lines[0].includes('.');

                                if (isHeading && lines.length > 1) {
                                    return (
                                        <div key={index}>
                                            <h3 className="text-2xl font-bold text-white mb-4">
                                                {lines[0]}
                                            </h3>
                                            {lines.slice(1).map((line, i) => (
                                                <p key={i} className="text-white/90 leading-relaxed mb-4">
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    );
                                }

                                return (
                                    <p key={index} className="text-white/90 leading-relaxed">
                                        {section}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
