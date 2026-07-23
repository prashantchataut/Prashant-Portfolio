'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { hero } from '@/data/content';

export default function NameHero() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id="hero"
            className="relative min-h-[100svh] flex items-center justify-center px-6 overflow-hidden"
            aria-labelledby="hero-name"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-glow), transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(217, 119, 6, 0.06), transparent 50%)',
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto w-full pt-28 pb-20">
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl"
                >
                    <p className="text-mist font-sans text-base sm:text-lg mb-4">
                        {hero.greeting}
                    </p>

                    <h1
                        id="hero-name"
                        className="font-serif text-ink tracking-tight text-wrap-balance"
                        style={{
                            fontSize: 'clamp(2.75rem, 8vw, 5.5rem)',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.05,
                        }}
                    >
                        {hero.name}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span
                            className="font-devanagari text-2xl sm:text-3xl text-mist/80"
                            lang="ne"
                        >
                            {hero.devanagari}
                        </span>
                        <span className="text-sm sm:text-base text-mist font-sans tracking-wide">
                            {hero.phonetic}
                        </span>
                    </div>

                    <p
                        className="mt-8 font-serif text-ink text-wrap-balance"
                        style={{
                            fontSize: 'clamp(1.35rem, 3.2vw, 2rem)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.25,
                        }}
                    >
                        {hero.tagline}
                    </p>

                    <p className="mt-5 text-mist text-lg leading-relaxed max-w-2xl text-pretty">
                        {hero.subtext}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={hero.primaryCta.href}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-sand rounded-full text-sm font-medium hover:bg-accent-light transition-colors duration-200 cursor-pointer"
                        >
                            {hero.primaryCta.label}
                            <ArrowDown size={16} aria-hidden="true" />
                        </a>
                        <a
                            href={hero.secondaryCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-surface text-ink rounded-full text-sm font-medium hover:border-accent transition-colors duration-200 cursor-pointer"
                        >
                            {hero.secondaryCta.label}
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                        <a
                            href={hero.tertiaryCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-mist rounded-full text-sm font-medium hover:border-accent hover:text-ink transition-colors duration-200 cursor-pointer"
                        >
                            {hero.tertiaryCta.label}
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
