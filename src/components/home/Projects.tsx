'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { prody } from '@/data/content';
import Image from 'next/image';

const slides = [
    { src: '/images/prody2.png', alt: 'Prody — Message to your future self' },
    { src: '/images/prody1.png', alt: 'Prody — Journal companion' },
];

export default function Projects() {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => setCurrent(prev => (prev + 1) % slides.length), []);
    const prev = useCallback(() => setCurrent(prev => (prev - 1 + slides.length) % slides.length), []);

    useEffect(() => {
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [next]);

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
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={slides[current].src}
                                    alt={slides[current].alt}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                            <button
                                onClick={prev}
                                className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div className="flex items-center gap-1.5">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrent(i)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            i === current ? 'bg-accent w-4' : 'bg-white/40 hover:bg-white/60'
                                        }`}
                                        aria-label={`Slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={next}
                                className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                                aria-label="Next"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}