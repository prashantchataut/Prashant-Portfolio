"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Main Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            >
                {/* Small Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-sm tracking-[0.3em] uppercase text-mist mb-8 font-mono"
                >
                    AI Enthusiast · Systems Builder
                </motion.p>

                {/* Name */}
                <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter text-ink">
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="block"
                        >
                            Prashant
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                            className="block text-accent"
                        >
                            Chataut
                        </motion.span>
                    </span>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-8 text-lg md:text-xl text-mist max-w-xl mx-auto leading-relaxed"
                >
                    Building thoughtful systems at the intersection of
                    human intent and machine intelligence.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
            >
                <span className="text-[10px] uppercase tracking-[0.25em] text-mist font-mono">
                    Scroll
                </span>
                <div className="w-px h-8 bg-mist/30 relative overflow-hidden">
                    <div className="w-full h-full bg-accent animate-scroll-line" />
                </div>
            </motion.div>
        </section>
    );
}
