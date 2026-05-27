'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { about } from '@/data/content';

export default function About() {
    return (
        <section id="about" className="py-24 sm:py-32 relative">
            <div className="section-divider" />

            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent font-sans mb-4">
                        About
                    </p>
                    <h2 className="text-4xl sm:text-6xl font-serif text-ink tracking-tight">
                        {about.sectionTitle}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-elevated">
                            <Image
                                src={about.photoSrc}
                                alt={about.photoAlt}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 space-y-6"
                    >
                        {about.body.map((paragraph, i) => (
                            <p key={i} className="text-lg text-mist leading-relaxed">
                                {paragraph}
                            </p>
                        ))}

                        <div className="pt-8 flex flex-wrap gap-4">
                            <a
                                href={about.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full text-sm font-medium"
                            >
                                GitHub
                            </a>
                            <a
                                href={about.links.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full text-sm font-medium"
                            >
                                Instagram
                            </a>
                            <a
                                href={about.links.email}
                                className="px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full text-sm font-medium"
                            >
                                Email
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}