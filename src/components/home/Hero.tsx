"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

// Utility for wrapping logic
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // Velocity Marquee Logic
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * 2 * (delta / 1000); // Base speed

        // Velocity effect
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full flex flex-col justify-between bg-sand overflow-hidden border-b border-white/10"
        >
            <ParticleBackground />

            {/* Top Bar - Solid & Structural */}
            <div className="flex justify-between items-start pt-8 px-6 md:px-12 w-full z-20 mix-blend-difference pointer-events-none">
                <div className="flex flex-col pointer-events-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-ink font-mono">Prashant Chataut</span>
                    <span className="text-[10px] uppercase tracking-widest text-mist font-mono">AI Enthusiast</span>
                </div>

                {/* Interactive Coordinates */}
                <div className="group relative flex flex-col text-right cursor-crosshair pointer-events-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-ink font-mono">Nepal</span>
                    <span className="text-[10px] uppercase tracking-widest text-mist font-mono">28.68° N / 80.60° E</span>

                    {/* Radar/Map Reveal */}
                    <div className="absolute top-full right-0 mt-2 w-32 h-32 bg-ink/90 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden flex items-center justify-center border border-white/10">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 border-[0.5px] border-accent/30 rounded-full scale-50 animate-ping" />
                            <div className="absolute inset-0 border-[0.5px] border-accent/20 rounded-full scale-75 animate-ping" style={{ animationDelay: '0.5s' }} />
                            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2" />
                            <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/80.60,28.68,9,0/300x300?access_token=YOUR_TOKEN_HERE')] bg-cover opacity-20" />
                            {/* Placeholder map effect using CSS grid simply if no API key */}
                            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="border-[0.5px] border-white/5" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Massive Name - The "Solid" Block */}
            <motion.div
                style={{ y }}
                className="relative flex-1 flex flex-col items-center justify-center w-full z-10 pointer-events-none"
            >
                <div className="w-full px-4 md:px-8 pointer-events-auto">
                    <div className="border-t border-b border-white/10 py-4 md:py-8 overflow-hidden group hover:bg-white/5 transition-colors duration-500">
                        <h1 className="text-[14vw] font-black leading-[0.85] tracking-tighter text-center text-ink uppercase mix-blend-exclusion">
                            <span className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                    className="block relative"
                                >
                                    Prashant
                                </motion.span>
                            </span>
                            <span className="block overflow-hidden relative">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                    className="block text-outline-only transparent-text hover:text-accent transition-colors duration-300 cursor-none"
                                    style={{ WebkitTextStroke: '1px currentColor' } as any}
                                    data-cursor="hover"
                                >
                                    Chataut
                                </motion.span>
                            </span>
                        </h1>
                    </div>
                </div>

                {/* Horizontal Strip - Kinetic Element (Velocity Marquee) */}
                <div className="w-full mt-12 overflow-hidden bg-accent/5 border-y border-accent/20 py-2 backdrop-blur-sm">
                    <motion.div
                        style={{ x }}
                        className="flex whitespace-nowrap gap-12 text-xs font-bold uppercase tracking-[0.3em] text-accent font-mono"
                    >
                        {Array(8).fill("Based in Dhangadhi • Building Systems • Orchestrating Intelligence •").map((item, i) => (
                            <span key={i}>{item}</span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Bar - Navigation */}
            <div className="flex justify-between items-end pb-8 px-6 md:px-12 w-full z-20 mix-blend-difference pointer-events-auto">
                <div className="flex gap-4">
                    <button className="text-xs font-bold uppercase tracking-widest text-ink hover:text-accent transition-colors font-mono" data-cursor="hover">Works</button>
                    <button className="text-xs font-bold uppercase tracking-widest text-ink hover:text-accent transition-colors font-mono" data-cursor="hover">Philosophy</button>
                </div>
                <div>
                    <span className="text-[10px] uppercase tracking-widest text-mist font-mono animate-pulse">Scroll for more</span>
                </div>
            </div>
        </div>
    );
}
