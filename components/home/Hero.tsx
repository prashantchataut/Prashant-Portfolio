"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-sand">
            {/* Background Gradient/Video Placeholder */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,_rgba(200,200,200,0.5),transparent_70%)]" />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 text-center px-4"
            >
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-mist animate-fade-in text-center">
                    Prashant Chataut
                </p>

                <h1 className="text-[13vw] sm:text-[10vw] font-bold leading-[0.85] tracking-tighter text-ink mix-blend-multiply flex flex-col items-center">
                    <span className="opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>CREATIVE</span>
                    <span className="opacity-0 animate-fade-up text-outline-ink text-sand" style={{ animationDelay: '0.2s', WebkitTextStroke: '2px #0f172a' }}>DEVELOPER</span>
                </h1>

                <div className="mt-8 flex justify-center gap-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    <p className="max-w-md text-sm sm:text-base text-mist font-medium leading-relaxed">
                        Crafting digital experiences with a focus on motion, interactivity, and clean aesthetics.
                    </p>
                </div>

                <div className="mt-10 flex justify-center opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
                    <MagneticButton>
                        <a href="#projects" className="inline-flex items-center justify-center px-8 py-3 bg-ink text-sand rounded-full text-sm font-semibold tracking-wide transition-transform hover:scale-105">
                            Explore Work
                        </a>
                    </MagneticButton>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest text-mist">Scroll</span>
                <div className="w-[1px] h-12 bg-gray-300 overflow-hidden">
                    <div className="w-full h-1/2 bg-ink animate-scroll-line"></div>
                </div>
            </motion.div>
        </div>
    );
}
