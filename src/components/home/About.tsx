"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import ParallaxImage from '../ui/ParallaxImage';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={containerRef} id="about" className="py-24 sm:py-32 bg-sand relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Text Content */}
                <motion.div style={{ y: textY, opacity }} className="relative z-10 order-2 lg:order-1">
                    <p className="text-sm uppercase tracking-[0.3em] text-accent mb-6 font-mono">System.Identity</p>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink mb-8 leading-tight">
                        Analytical thinking. <br /><span className="text-mist">Generative workflows.</span>
                    </h2>

                    <div className="space-y-6 text-lg leading-relaxed text-mist">
                        <p>
                            I don't just write code; I orchestrate intelligence. My work focuses on <strong>Vibe Coding</strong>—blending prompt engineering, workflow automation, and generative AI to solve complex problems with speed and precision.
                        </p>
                        <p>
                            With a background in analytical thinking and over a year of hands-on experience in advanced AI systems, I build tools that feel like magic. I am curious, disciplined, and obsessed with the intersection of human creativity and machine logic.
                        </p>
                    </div>

                    <div className="mt-12 flex gap-12 border-t border-ink/10 pt-8">
                        <div>
                            <p className="text-4xl font-bold text-ink">3+</p>
                            <p className="text-sm text-mist mt-1 uppercase tracking-wider">Years Tech</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-ink">Prody</p>
                            <p className="text-sm text-mist mt-1 uppercase tracking-wider">Latest Build</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Creative Image Reveal */}
                <div className="relative h-[500px] w-full order-1 lg:order-2">
                    <ParallaxImage
                        src="/images/about-abstract.png"
                        alt="Abstract AI Mind"
                        className="grayscale hover:grayscale-0 transition-all duration-700 ease-in-out mix-blend-multiply"
                        containerClassName="rounded-2xl h-full w-full shadow-2xl"
                    />

                    {/* Dekor Element */}
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-ink rounded-full mix-blend-multiply opacity-20 animate-pulse" />
                </div>

            </div>
        </section>
    );
}
