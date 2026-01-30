"use client";
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MagneticButton from '../ui/MagneticButton';
import { Check, ArrowUpRight } from 'lucide-react';

const features = [
    "Reflect through journaling (quick notes or deeper entries)",
    "Learn through daily vocabulary and wisdom content",
    "Stay connected to your future self through scheduled messages",
    "See patterns in your thoughts over time",
    "AI companions that guide reflection without preaching"
];

const latestUpdate = {
    version: "1.2.0",
    title: "Haven AI: Resilience & Warmth",
    summary: "Major reliability upgrade for the Haven AI Service ('Anti-Stop Policy') and a completely redesigned, empathetic onboarding experience.",
    changes: [
        "Implemented 'Anti-Stop' policy: AI service now degrades gracefully into Offline Mode.",
        "Redesigned Onboarding Flow: Added dedicated Haven introduction screen.",
        "Hardened System Prompts: Enforced strict therapeutic boundaries.",
        "UI Polish: Flattened design aesthetics and updated icon assets."
    ]
};

function TiltCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section id="prody" className="py-32 bg-sand relative overflow-hidden text-ink">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-20 text-center md:text-left">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 font-mono">My Magnum Opus</p>
                    <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-ink mb-6">
                        Prody. <br />
                        <span className="text-mist font-normal font-serif italic">A Calmer Mind.</span>
                    </h2>
                    <p className="max-w-2xl text-lg text-mist leading-relaxed font-secondary">
                        Prody is a self‑improvement companion built for people who want to grow without turning life into a checklist. It’s not a habit tracker, and it’s not a “chatbot app.”
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content & Features */}
                    <div className="space-y-10 order-2 lg:order-1">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-ink">The Core Loop</h3>
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
                                        <span className="p-1 bg-ink/5 rounded-full text-ink group-hover:bg-ink group-hover:text-sand transition-colors mt-0.5">
                                            <Check size={12} />
                                        </span>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 bg-white rounded-2xl border border-ink/5 shadow-sm hover:border-accent/20 transition-all">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider rounded">Latest Update v{latestUpdate.version}</span>
                                <h4 className="text-lg font-bold text-ink">{latestUpdate.title}</h4>
                            </div>
                            <p className="text-sm text-mist leading-relaxed mb-4">
                                {latestUpdate.summary}
                            </p>
                            <ul className="space-y-2">
                                {latestUpdate.changes.map((change, i) => (
                                    <li key={i} className="text-xs text-mist flex items-start gap-2">
                                        <span className="w-1 h-1 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                                        {change}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <MagneticButton>
                                <Link
                                    href="https://github.com/prashantchataut/Prody/releases/latest"
                                    target="_blank"
                                    className="px-8 py-4 bg-ink text-sand rounded-full font-bold shadow-lg shadow-ink/20 hover:shadow-xl transition-all text-sm flex items-center gap-2 group"
                                >
                                    Download Prody
                                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <Link
                                    href="#"
                                    className="px-8 py-4 bg-white text-ink border border-ink/10 rounded-full font-bold hover:bg-ash transition-colors text-sm"
                                >
                                    Read Manifesto
                                </Link>
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Right: App Mockup Visual with 3D Tilt */}
                    <div className="relative order-1 lg:order-2 h-[600px] w-full perspective-1000">
                        <TiltCard>
                            <div className="w-full h-full bg-ash/50 rounded-3xl overflow-hidden shadow-2xl border border-white/50 backdrop-blur-sm relative flex items-center justify-center transform transition-transform">
                                {/* Circle Blur Backdrops */}
                                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
                                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate/10 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: '1s' }} />

                                <div className="relative z-10 w-full h-[80%] transform translate-z-20 px-8">
                                    <Image
                                        src="/assets/changelog/haven_onboarding_showcase.png"
                                        alt="Haven AI: Resilience & Warmth Showcase"
                                        fill
                                        className="object-contain drop-shadow-2xl rounded-xl"
                                        style={{ transform: "translateZ(50px)" }}
                                    />
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
