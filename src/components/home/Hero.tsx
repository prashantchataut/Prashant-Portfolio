"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <div ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-sand perspective-1000">
            {/* Liquid Metal Background */}
            <div className="absolute inset-0 opacity-40 bg-[url('/images/liquid-metal.png')] bg-cover bg-center mix-blend-exclusion filter brightness-50 contrast-150 animate-pulse" />

            {/* Chaotic Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('/images/kinetic-type.png')] bg-repeat mix-blend-overlay" />

            {/* Massive Kinetic Typography */}
            <motion.div style={{ y }} className="relative z-10 flex flex-col items-center justify-center w-full">

                <h1 className="text-[18vw] font-black leading-[0.7] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-ink to-transparent select-none mix-blend-difference hover:text-accent transition-colors duration-300 liquid-metal">
                    VIBE
                </h1>

                <div className="relative">
                    <h1 className="text-[18vw] font-black leading-[0.7] tracking-tighter text-ink select-none mix-blend-difference relative z-20 glitch-text">
                        CODER
                    </h1>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black leading-[0.7] tracking-tighter text-accent/20 blur-xl z-10">
                        CODER
                    </span>
                </div>

                <p className="mt-12 text-sm sm:text-base font-mono uppercase tracking-[0.5em] text-accent animate-pulse">
                    System.Override :: Chaos_Engine_V.3.0
                </p>

            </motion.div>

            {/* Command Center Nav Prompt */}
            <div className="absolute bottom-12 flex flex-col items-center gap-6 z-30">
                <MagneticButton>
                    <a href="#prody" className="group relative px-6 py-3 bg-transparent border border-ink/30 rounded-none overflow-hidden transition-all hover:border-accent">
                        <span className="relative z-10 text-ink font-mono text-xs uppercase tracking-widest group-hover:text-accent">Initiate_Sequence</span>
                        <div className="absolute inset-0 bg-ink/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                </MagneticButton>
            </div>

            {/* Scroll Distortion Line */}
            <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-ink/20 hidden md:block">
                <motion.div style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} className="w-full bg-accent shadow-[0_0_10px_#ff3333]" />
            </div>
        </div>
    );
}
