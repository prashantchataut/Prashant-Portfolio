'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { about } from '@/data/content';
import Reveal, { EASE } from '@/components/ui/Reveal';

const stats = [
    { value: '3', label: 'products shipped' },
    { value: '2', label: 'platforms — Android · Web' },
    { value: '1', label: 'Play Store launch' },
];

export default function About() {
    const reduce = useReducedMotion();

    return (
        <section id="about" className="py-24 sm:py-36 relative">
            <div className="section-divider absolute inset-x-0 top-0" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <Reveal className="mb-14 sm:mb-20">
                    <p className="mono-label text-mist mb-4">02 — About</p>
                    <h2 className="display text-ink text-wrap-balance" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
                        The person behind <em className="text-accent">the pixels</em>.
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">
                    {/* portrait */}
                    <Reveal className="relative max-w-md w-full mx-auto lg:mx-0">
                        <div
                            className="absolute -inset-3 rounded-3xl border border-accent/30 translate-x-4 translate-y-4 pointer-events-none"
                            aria-hidden="true"
                        />
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border bg-surface-elevated">
                            <motion.div
                                initial={reduce ? false : { scale: 1.12 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 1.6, ease: EASE }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={about.photoSrc}
                                    alt={about.photoAlt}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 90vw, 38vw"
                                />
                            </motion.div>
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-sand/30 via-transparent to-transparent mix-blend-multiply pointer-events-none"
                                aria-hidden="true"
                            />
                        </div>
                        <p className="mono-label text-mist/70 mt-6 flex items-center gap-3">
                            <span className="w-6 h-px bg-accent" aria-hidden="true" />
                            Prashant Chataut — Nepal
                        </p>
                    </Reveal>

                    {/* copy */}
                    <div>
                        <div className="space-y-6">
                            {about.body.map((paragraph, i) => (
                                <Reveal key={i} delay={0.08 * i}>
                                    <p className="text-mist text-lg sm:text-xl leading-relaxed text-pretty">
                                        {paragraph}
                                    </p>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.2} className="mt-12">
                            <div className="grid grid-cols-3 divide-x divide-border border-y border-border">
                                {stats.map((s) => (
                                    <div key={s.label} className="py-6 px-4 sm:px-6 text-center sm:text-left">
                                        <p className="display text-4xl sm:text-5xl text-accent">{s.value}</p>
                                        <p className="mono-label text-mist mt-2">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={0.28} className="pt-10 flex flex-wrap gap-4">
                            {[
                                { label: 'GitHub', href: about.links.github },
                                { label: 'Instagram', href: about.links.instagram },
                                { label: 'Email', href: about.links.email },
                            ].map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    target={l.href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 px-6 py-3 border border-border text-mist hover:border-accent/60 hover:text-ink transition-all duration-300 rounded-full text-sm font-medium hover:-translate-y-0.5"
                                >
                                    {l.label}
                                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                                </a>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
