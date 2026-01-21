"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';

const MASK_SIZE = 1200;

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // Mouse hover effect for "Solid" feel (Spotlight/Reveal)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full flex flex-col justify-between bg-sand overflow-hidden border-b border-white/10"
            onMouseMove={handleMouseMove}
        >

            {/* Top Bar - Solid & Structural */}
            <div className="flex justify-between items-start pt-8 px-6 md:px-12 w-full z-20 mix-blend-difference">
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest text-ink">Prashant Chataut</span>
                    <span className="text-[10px] uppercase tracking-widest text-mist">AI Enthusiast</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-xs font-bold uppercase tracking-widest text-ink">Nepal</span>
                    <span className="text-[10px] uppercase tracking-widest text-mist">28.68° N / 80.60° E</span>
                </div>
            </div>

            {/* Massive Name - The "Solid" Block */}
            <motion.div
                style={{ y }}
                className="relative flex-1 flex flex-col items-center justify-center w-full z-10"
            >
                <div className="w-full px-4 md:px-8">
                    <div className="border-t border-b border-white/10 py-4 md:py-8 overflow-hidden group hover:bg-white/5 transition-colors duration-500">
                        <h1 className="text-[14vw] font-black leading-[0.85] tracking-tighter text-center text-ink uppercase mix-blend-exclusion">
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
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                    className="block text-outline-only transparent-text hover:text-accent transition-colors duration-300"
                                    style={{ WebkitTextStroke: '1px currentColor' }}
                                >
                                    Chataut
                                </motion.span>
                            </span>
                        </h1>
                    </div>
                </div>

                {/* Horizontal Strip - Kinetic Element */}
                <div className="w-full mt-12 overflow-hidden bg-accent/10 border-y border-accent/20 py-2">
                    <motion.div
                        initial={{ x: "0%" }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="flex whitespace-nowrap gap-12 text-xs font-bold uppercase tracking-[0.3em] text-accent"
                    >
                        {Array(10).fill("Based in Dhangadhi • Building Systems • Orchestrating Intelligence •").map((item, i) => (
                            <span key={i}>{item}</span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Bar - Navigation */}
            <div className="flex justify-between items-end pb-8 px-6 md:px-12 w-full z-20 mix-blend-difference">
                <div className="flex gap-4">
                    <button className="text-xs font-bold uppercase tracking-widest text-ink hover:text-accent transition-colors">Works</button>
                    <button className="text-xs font-bold uppercase tracking-widest text-ink hover:text-accent transition-colors">Philosophy</button>
                </div>
                <div>
                    <span className="text-[10px] uppercase tracking-widest text-mist">Scroll for more</span>
                </div>
            </div>

            {/* Subtle Grid Interaction */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-20 z-0 transition duration-300 group-hover:opacity-50"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            ${MASK_SIZE}px circle at ${mouseX}px ${mouseY}px,
                            var(--accent),
                            transparent 80%
                        )
                    `,
                }}
            />
        </div>
    );
}
