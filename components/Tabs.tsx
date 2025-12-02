'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

type TabId = 'eventInfo' | 'eventRules' | 'pricing' | 'artists';

export default function Tabs() {
    const t = useTranslations();
    const [activeTab, setActiveTab] = useState<TabId>('eventInfo');

    const tabs: { id: TabId; label: string }[] = [
        { id: 'eventInfo', label: t('tabs.eventInfo') },
        { id: 'eventRules', label: t('tabs.eventRules') },
        { id: 'pricing', label: t('tabs.pricing') },
    ];

    const handleKeyDown = (e: React.KeyboardEvent, tabId: TabId, index: number) => {
        if (e.key === 'ArrowRight') {
            const nextIndex = (index + 1) % tabs.length;
            setActiveTab(tabs[nextIndex].id);
        } else if (e.key === 'ArrowLeft') {
            const prevIndex = (index - 1 + tabs.length) % tabs.length;
            setActiveTab(tabs[prevIndex].id);
        }
    };

    return (
        <section id="info" className="section-padding">
            <div className="container-custom">
                <div className="glass-strong rounded-2xl p-6 md:p-8">
                    {/* Tab buttons */}
                    <div
                        role="tablist"
                        className="flex flex-wrap gap-2 mb-8 border-b border-glass-border pb-4"
                    >
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                aria-controls={`panel-${tab.id}`}
                                tabIndex={activeTab === tab.id ? 0 : -1}
                                onClick={() => setActiveTab(tab.id)}
                                onKeyDown={(e) => handleKeyDown(e, tab.id, index)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-accent text-black'
                                    : 'glass text-white/70 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab panels */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            role="tabpanel"
                            id={`panel-${activeTab}`}
                            aria-labelledby={`tab-${activeTab}`}
                            className="min-h-[400px]"
                        >
                            {activeTab === 'eventInfo' && <EventInfoPanel />}
                            {activeTab === 'eventRules' && <EventRulesPanel />}
                            {activeTab === 'pricing' && <PricingPanel />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function EventInfoPanel() {
    const t = useTranslations('eventInfo');
    const content = t('content');

    return (
        <div className="prose prose-invert max-w-none">
            {content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-white/90 leading-relaxed mb-4">
                    {paragraph}
                </p>
            ))}
        </div>
    );
}

function EventRulesPanel() {
    const t = useTranslations('eventRules');
    const rules = t.raw('rules') as string[];

    return (
        <div className="space-y-3">
            <ol className="list-decimal list-inside space-y-3">
                {rules.map((rule, index) => (
                    <li key={index} className="text-white/90 leading-relaxed pl-2">
                        <span className="ml-2">{rule}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function PricingPanel() {
    const t = useTranslations('pricing');
    const categories = t.raw('categories') as Array<{ name: string; price: number }>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-glass-border">
                        <th className="text-left py-4 px-4 text-white/90 font-semibold">
                            {t('categoryName')}
                        </th>
                        <th className="text-right py-4 px-4 text-white/90 font-semibold">
                            Fiyat / Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr
                            key={index}
                            className="border-b border-glass-border/50 hover:bg-white/5 transition-colors"
                        >
                            <td className="py-4 px-4 text-white/90">{category.name}</td>
                            <td className="py-4 px-4 text-right text-accent font-semibold">
                                {formatPrice(category.price)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
