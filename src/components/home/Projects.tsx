'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { prody } from '@/data/content';
import Image from 'next/image';

export default function Projects() {
    return (
        <section id="prody" className="py-24 sm:py-32 relative">
            <div className="section-divider" />

            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent font-sans mb-4">
                        What I&apos;m building
                    </p>
                    <h2 className="text-4xl sm:text-6xl font-serif text-ink tracking-tight mb-4">
                        {prody.tagline}
                    </h2>
                    <p className="text-lg text-mist max-w-2xl leading-relaxed">
                        {prody.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <ul className="space-y-4">
                            {prody.features.map((feature, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-3 text-mist"
                                >
                                    <span className="text-accent mt-1 flex-shrink-0">
                                        <Check size={14} />
                                    </span>
                                    <span className="leading-relaxed">{feature}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-3 text-sm text-mist">
                            <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full font-sans text-xs uppercase tracking-wider">
                                {prody.status}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href={prody.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-border bg-surface text-ink rounded-full text-sm font-medium hover:border-accent hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
                            >
                                View on GitHub
                                <ArrowUpRight size={16} className="text-mist group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-[9/16] sm:aspect-[3/4] lg:aspect-[9/16] rounded-2xl overflow-hidden bg-surface-elevated border border-border"
                    >
                        <Image
                            src="/assets/changelog/haven_onboarding_showcase.png"
                            alt="Prody — Self-improvement companion app"
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}