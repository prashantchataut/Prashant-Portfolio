'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Github } from 'lucide-react';
import Image from 'next/image';
import { nebians, retra, prody } from '@/data/content';

function ProjectGallery({
    slides,
    label,
}: {
    slides: Array<{ src: string; alt: string }>;
    label: string;
}) {
    const [current, setCurrent] = useState(0);
    const reduceMotion = useReducedMotion();

    const next = useCallback(
        () => setCurrent((prev) => (prev + 1) % slides.length),
        [slides.length]
    );
    const prev = useCallback(
        () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length),
        [slides.length]
    );

    useEffect(() => {
        if (reduceMotion || slides.length < 2) return;
        const timer = setInterval(next, 4500);
        return () => clearInterval(timer);
    }, [next, reduceMotion, slides.length]);

    return (
        <div
            className="relative aspect-[9/16] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-surface-elevated border border-border"
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={reduceMotion ? false : { opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -28 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[current].src}
                        alt={slides[current].alt}
                        fill
                        className="object-contain p-3 sm:p-4"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={current === 0}
                    />
                </motion.div>
            </AnimatePresence>

            {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={prev}
                        className="w-9 h-9 rounded-full bg-ink/50 text-sand flex items-center justify-center hover:bg-ink/70 transition-colors cursor-pointer"
                        aria-label="Previous screenshot"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                role="tab"
                                aria-selected={i === current}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all cursor-pointer ${
                                    i === current ? 'bg-accent w-4' : 'bg-sand/50 w-2 hover:bg-sand/80'
                                }`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={next}
                        className="w-9 h-9 rounded-full bg-ink/50 text-sand flex items-center justify-center hover:bg-ink/70 transition-colors cursor-pointer"
                        aria-label="Next screenshot"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}

function FeatureList({ features }: { features: string[] }) {
    return (
        <ul className="space-y-3">
            {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-mist">
                    <span className="text-accent mt-1 flex-shrink-0" aria-hidden="true">
                        <Check size={14} />
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                </li>
            ))}
        </ul>
    );
}

export default function Projects() {
    const reduceMotion = useReducedMotion();

    return (
        <section id="work" className="py-24 sm:py-32 relative">
            <div className="section-divider" />

            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl sm:text-6xl font-serif text-ink tracking-tight text-wrap-balance">
                        Work.
                    </h2>
                    <p className="text-lg text-mist max-w-2xl leading-relaxed mt-4">
                        Stuff I&apos;ve shipped or I&apos;m still building.
                    </p>
                </motion.div>

                {/* NEBians */}
                <article className="mb-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3 flex-wrap">
                                <Image
                                    src="/images/nebians/logo.png"
                                    alt=""
                                    width={36}
                                    height={36}
                                    className="rounded-lg"
                                />
                                <h3 className="text-3xl sm:text-4xl font-serif text-ink tracking-tight">
                                    {nebians.name}
                                </h3>
                                <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full font-sans text-xs uppercase tracking-wider">
                                    {nebians.status}
                                </span>
                            </div>
                            <p className="text-accent text-sm font-medium">{nebians.tagline}</p>
                            <p className="text-mist text-lg leading-relaxed">{nebians.description}</p>
                            <FeatureList features={nebians.features} />
                            <div className="flex flex-wrap gap-3 pt-2">
                                <a
                                    href={nebians.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-accent text-sand rounded-full text-sm font-medium hover:bg-accent-light transition-colors inline-flex items-center gap-2 cursor-pointer"
                                >
                                    Open site
                                    <ArrowUpRight size={14} />
                                </a>
                                <a
                                    href={nebians.links.playStore}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 border border-border bg-surface text-ink rounded-full text-sm font-medium hover:border-accent transition-colors inline-flex items-center gap-2 cursor-pointer"
                                >
                                    Play Store
                                    <ArrowUpRight size={14} />
                                </a>
                                <a
                                    href={nebians.links.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 border border-border text-mist rounded-full text-sm font-medium hover:border-accent hover:text-ink transition-colors inline-flex items-center gap-2 cursor-pointer"
                                >
                                    Instagram
                                    <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <ProjectGallery slides={nebians.images} label="NEBians screenshots" />
                        </motion.div>
                    </div>
                </article>

                {/* Retra + Prody */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    <motion.article
                        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-5"
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-2xl sm:text-3xl font-serif text-ink tracking-tight">
                                {retra.name}
                            </h3>
                            <span className="px-3 py-1 bg-surface-elevated text-mist border border-border rounded-full font-sans text-xs uppercase tracking-wider">
                                {retra.status}
                            </span>
                        </div>
                        <p className="text-accent text-sm font-medium">{retra.tagline}</p>
                        <p className="text-mist leading-relaxed">{retra.description}</p>
                        <FeatureList features={retra.features} />
                        <a
                            href={retra.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-surface text-ink rounded-full text-sm font-medium hover:border-accent transition-colors cursor-pointer"
                        >
                            <Github size={14} aria-hidden="true" />
                            View on GitHub
                            <ArrowUpRight size={14} />
                        </a>
                    </motion.article>

                    <motion.article
                        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: reduceMotion ? 0 : 0.08 }}
                        className="space-y-5"
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-2xl sm:text-3xl font-serif text-ink tracking-tight">
                                {prody.name}
                            </h3>
                            <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full font-sans text-xs uppercase tracking-wider">
                                {prody.status}
                            </span>
                        </div>
                        <p className="text-accent text-sm font-medium">{prody.tagline}</p>
                        <p className="text-mist leading-relaxed">{prody.description}</p>
                        <FeatureList features={prody.features} />
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-elevated border border-border">
                            <Image
                                src={prody.images[0].src}
                                alt={prody.images[0].alt}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>
                        <a
                            href={prody.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-surface text-ink rounded-full text-sm font-medium hover:border-accent transition-colors cursor-pointer"
                        >
                            <Github size={14} aria-hidden="true" />
                            Releases
                            <ArrowUpRight size={14} />
                        </a>
                    </motion.article>
                </div>
            </div>
        </section>
    );
}
