'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { hero } from '@/data/content';
import { useTheme } from '@/components/providers/ThemeProvider';
import ScrambleText from '@/components/ui/ScrambleText';
import Marquee from '@/components/ui/Marquee';
import { EASE } from '@/components/ui/Reveal';

const EmberScene = dynamic(() => import('@/components/three/EmberScene'), {
    ssr: false,
    loading: () => <div className="absolute inset-0" aria-hidden="true" />,
});

function MaskLine({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const reduce = useReducedMotion();
    return (
        <span className="mask-line">
            <motion.span
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay, ease: EASE }}
            >
                {children}
            </motion.span>
        </span>
    );
}

export default function NameHero() {
    const reduce = useReducedMotion();
    const { theme } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const sceneY = useTransform(scrollYProgress, [0, 1], [0, 220]);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
            aria-labelledby="hero-name"
        >
            {/* ember field */}
            <motion.div
                style={reduce ? undefined : { y: sceneY }}
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <EmberScene theme={theme === 'light' ? 'light' : 'dark'} still={!!reduce} className="absolute inset-0" />
            </motion.div>

            {/* warm horizon glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(ellipse 90% 42% at 50% 108%, var(--accent-glow), transparent 62%), radial-gradient(ellipse 60% 34% at 82% -8%, var(--accent-glow), transparent 60%)',
                }}
            />

            {/* side rail */}
            <div
                className="hidden lg:flex absolute left-8 bottom-28 flex-col items-center gap-4 z-10"
                aria-hidden="true"
            >
                <span className="mono-label text-mist/70 [writing-mode:vertical-rl] rotate-180">
                    Kathmandu · Nepal
                </span>
                <span className="w-px h-16 bg-border" />
            </div>

            <motion.div
                style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
                className="relative z-10 max-w-6xl mx-auto w-full px-6 lg:px-8 pt-32 pb-16"
            >
                <motion.p
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="mono-label text-mist flex items-center gap-3 mb-8"
                >
                    <span className="ember-dot w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    Builder — shipping from Nepal
                </motion.p>

                <h1
                    id="hero-name"
                    className="display text-ink"
                    style={{ fontSize: 'clamp(3.4rem, 11.5vw, 9.5rem)' }}
                >
                    <MaskLine delay={0.25}>Prashant</MaskLine>
                    <MaskLine delay={0.4}>
                        <em className="text-accent">Chataut</em>
                        <span className="text-accent">.</span>
                    </MaskLine>
                </h1>

                <motion.div
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.85 }}
                    className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2"
                >
                    <span className="font-devanagari text-xl sm:text-2xl text-mist" lang="ne">
                        {hero.devanagari}
                    </span>
                    <span className="w-px h-4 bg-border" aria-hidden="true" />
                    <ScrambleText
                        text={hero.phonetic}
                        delay={900}
                        className="mono-label text-accent"
                    />
                </motion.div>

                <motion.p
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
                    className="mt-10 max-w-2xl font-serif text-ink text-wrap-balance"
                    style={{ fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)', lineHeight: 1.3 }}
                >
                    I build apps people <em className="text-accent">actually use</em> — for
                    school, for play, for the quiet hours.
                </motion.p>

                <motion.p
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.12, ease: EASE }}
                    className="mt-4 text-mist text-base sm:text-lg leading-relaxed max-w-2xl text-pretty"
                >
                    {hero.subtext}
                </motion.p>

                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.24, ease: EASE }}
                    className="mt-10 flex flex-wrap items-center gap-3"
                >
                    <a
                        href={hero.primaryCta.href}
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-sand rounded-full text-sm font-semibold hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5 glow-sm cursor-pointer"
                    >
                        {hero.primaryCta.label}
                        <ArrowDown size={15} aria-hidden="true" className="group-hover:translate-y-0.5 transition-transform" />
                    </a>
                    <a
                        href={hero.secondaryCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-border bg-surface/60 backdrop-blur text-ink rounded-full text-sm font-medium hover:border-accent/60 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                        {hero.secondaryCta.label}
                        <ArrowUpRight size={15} aria-hidden="true" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                        href={hero.tertiaryCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-transparent text-mist rounded-full text-sm font-medium hover:text-ink transition-colors duration-300 cursor-pointer"
                    >
                        {hero.tertiaryCta.label}
                        <ArrowUpRight size={15} aria-hidden="true" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </motion.div>
            </motion.div>

            {/* scroll cue */}
            <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="relative z-10 hidden md:flex justify-center pb-8"
                aria-hidden="true"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="mono-label text-mist/60">scroll</span>
                    <motion.span
                        style={{ originY: 0 }}
                        animate={reduce ? undefined : { scaleY: [0, 1, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="block w-px h-10 bg-gradient-to-b from-accent to-transparent"
                    />
                </div>
            </motion.div>

            {/* marquee strip */}
            <div className="relative z-10 border-t border-border bg-surface/40 backdrop-blur-sm">
                <Marquee duration={36} className="py-4">
                    {['NEBians', 'Retra', 'Prody', 'Android', 'Web', 'Kotlin', 'React Native'].map(
                        (word) => (
                            <span key={word} className="flex items-center">
                                <span className="px-6 font-serif italic text-lg sm:text-xl text-mist">
                                    {word}
                                </span>
                                <span className="text-accent text-xs" aria-hidden="true">
                                    ✦
                                </span>
                            </span>
                        )
                    )}
                </Marquee>
            </div>
        </section>
    );
}
