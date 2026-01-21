"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MagneticButton from '../ui/MagneticButton';
import { Check } from 'lucide-react';

const features = [
    "Reflect through journaling (quick notes or deeper entries)",
    "Learn through daily vocabulary and wisdom content",
    "Stay connected to your future self through scheduled messages",
    "See patterns in your thoughts over time",
    "AI companions that guide reflection without preaching"
];

export default function Projects() {
    return (
        <section id="prody" className="py-32 bg-sand relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-20 text-center md:text-left">
                    <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4 font-mono">Featured Product</p>
                    <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter text-ink mb-6">
                        Prody. <br />
                        <span className="text-mist font-normal">A Calmer Mind.</span>
                    </h2>
                    <p className="max-w-2xl text-lg text-mist leading-relaxed">
                        Prody is a self‑improvement companion built for people who want to grow without turning life into a checklist. It’s not a habit tracker, and it’s not a “chatbot app.”
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content & Features */}
                    <div className="space-y-10 order-2 lg:order-1">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-ink">The Core Loop</h3>
                            <ul className="space-y-4">
                                {features.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3 text-mist group"
                                    >
                                        <span className="p-1 bg-ink/5 rounded-full text-ink group-hover:bg-ink group-hover:text-sand transition-colors">
                                            <Check size={14} />
                                        </span>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 bg-white rounded-2xl border border-ink/5 shadow-sm">
                            <h4 className="text-lg font-bold text-ink mb-2">Designed for Clarity</h4>
                            <p className="text-sm text-mist italic">
                                "You don’t need deep theory. You need the right question at the right time."
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <MagneticButton>
                                <Link
                                    href="#"
                                    className="px-8 py-4 bg-ink text-sand rounded-xl font-bold shadow-lg shadow-ink/20 hover:shadow-xl hover:scale-105 transition-all text-sm"
                                >
                                    Download Prody
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    href="#"
                                    className="px-8 py-4 bg-white text-ink border border-ink/10 rounded-xl font-bold hover:bg-ash transition-colors text-sm"
                                >
                                    Read Manifesto
                                </Link>
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Right: App Mockup Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative order-1 lg:order-2 h-[600px] w-full flex items-center justify-center bg-ash/50 rounded-3xl overflow-hidden shadow-inner border border-white/50 backdrop-blur-sm"
                    >
                        {/* Circle Blur Backdrops */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate/10 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: '1s' }} />

                        <div className="relative z-10 w-[300px] h-full">
                            <Image
                                src="/images/prody-mockup.png"
                                alt="Prody App Interface"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
