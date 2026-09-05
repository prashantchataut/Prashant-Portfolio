'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Check, Github, Play } from 'lucide-react';
import Image from 'next/image';
import { nebians, retra, prody } from '@/data/content';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import TiltCard from '@/components/ui/TiltCard';

function FeatureList({ features }: { features: string[] }) {
    return (
        <ul className="space-y-2.5">
            {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-mist text-sm sm:text-[15px]">
                    <span className="text-accent mt-0.5 flex-shrink-0" aria-hidden="true">
                        <Check size={14} />
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                </li>
            ))}
        </ul>
    );
}

function PhoneFrame({
    src,
    alt,
    className,
    priority = false,
}: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}) {
    return (
        <div
            className={`relative aspect-[9/17] overflow-hidden rounded-[1.4rem] border border-border bg-surface-elevated shadow-2xl shadow-black/30 ${className ?? ''}`}
        >
            <Image src={src} alt={alt} fill className="object-cover object-top" sizes="(max-width: 1024px) 60vw, 24vw" priority={priority} />
        </div>
    );
}

function NebiansShowcase() {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const yFront = useTransform(scrollYProgress, [0, 1], [46, -46]);
    const yLeft = useTransform(scrollYProgress, [0, 1], [-30, 60]);
    const yRight = useTransform(scrollYProgress, [0, 1], [70, -70]);

    return (
        <div ref={ref}>
            <SpotlightCard className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
                    {/* copy */}
                    <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center gap-6 relative z-10">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="mono-label text-mist/60">01</span>
                            <Image
                                src="/images/nebians/logo.png"
                                alt=""
                                width={40}
                                height={40}
                                className="rounded-xl"
                            />
                            <h3 className="text-3xl sm:text-5xl display text-ink">{nebians.name}</h3>
                            <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/25 rounded-full font-sans text-[11px] uppercase tracking-widest">
                                {nebians.status}
                            </span>
                        </div>

                        <p className="mono-label text-accent">{nebians.tagline}</p>
                        <p className="text-mist text-base sm:text-lg leading-relaxed max-w-xl">
                            {nebians.description}
                        </p>
                        <FeatureList features={nebians.features} />

                        <div className="flex flex-wrap gap-3 pt-2">
                            <a
                                href={nebians.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-accent text-sand rounded-full text-sm font-semibold hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                            >
                                Open site
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <a
                                href={nebians.links.playStore}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 px-6 py-3 border border-border bg-surface/60 text-ink rounded-full text-sm font-medium hover:border-accent/60 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                            >
                                <Play size={14} aria-hidden="true" />
                                Play Store
                            </a>
                            <a
                                href={nebians.links.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 px-6 py-3 border border-transparent text-mist rounded-full text-sm font-medium hover:text-ink transition-colors cursor-pointer"
                            >
                                Instagram
                                <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    {/* parallax phone collage */}
                    <div className="relative h-[440px] sm:h-[540px] lg:h-auto lg:min-h-[620px] border-t lg:border-t-0 lg:border-l border-border overflow-hidden bg-ash/40">
                        <div
                            className="absolute inset-0"
                            aria-hidden="true"
                            style={{
                                background:
                                    'radial-gradient(ellipse 70% 45% at 50% 100%, var(--accent-glow), transparent 65%)',
                            }}
                        />
                        <motion.div
                            style={reduce ? undefined : { y: yLeft }}
                            className="absolute left-[6%] top-[16%] w-[42%] -rotate-[7deg]"
                        >
                            <PhoneFrame src="/images/nebians/shot-1.jpg" alt={nebians.images[1]?.alt ?? 'NEBians app screenshot'} />
                        </motion.div>
                        <motion.div
                            style={reduce ? undefined : { y: yRight }}
                            className="absolute right-[5%] top-[24%] w-[42%] rotate-[7deg]"
                        >
                            <PhoneFrame src="/images/nebians/shot-2.jpg" alt={nebians.images[2]?.alt ?? 'NEBians app screenshot'} />
                        </motion.div>
                        <motion.div
                            style={reduce ? undefined : { y: yFront }}
                            className="absolute left-1/2 -translate-x-1/2 top-[7%] w-[52%] z-10"
                        >
                            <PhoneFrame src="/images/nebians/home.png" alt={nebians.images[0]?.alt ?? 'NEBians home screen'} priority />
                        </motion.div>
                    </div>
                </div>
            </SpotlightCard>
        </div>
    );
}

function SmallProjectCard({
    index,
    name,
    status,
    tagline,
    description,
    features,
    href,
    linkLabel,
    visual,
    delay = 0,
}: {
    index: string;
    name: string;
    status: string;
    tagline: string;
    description: string;
    features: string[];
    href: string;
    linkLabel: string;
    visual: React.ReactNode;
    delay?: number;
}) {
    return (
        <Reveal delay={delay} className="h-full">
            <TiltCard className="h-full">
                <SpotlightCard className="h-full flex flex-col p-8 sm:p-10">
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="mono-label text-mist/60">{index}</span>
                        <h3 className="text-2xl sm:text-4xl display text-ink">{name}</h3>
                        <span className="px-3 py-1 bg-surface-elevated text-mist border border-border rounded-full font-sans text-[11px] uppercase tracking-widest">
                            {status}
                        </span>
                    </div>
                    <p className="mono-label text-accent mt-5">{tagline}</p>
                    <p className="text-mist leading-relaxed mt-3">{description}</p>

                    <div className="mt-6">{visual}</div>

                    <div className="mt-6">
                        <FeatureList features={features} />
                    </div>

                    <div className="mt-auto pt-8">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-6 py-3 border border-border bg-surface/60 text-ink rounded-full text-sm font-medium hover:border-accent/60 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                        >
                            <Github size={14} aria-hidden="true" />
                            {linkLabel}
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </SpotlightCard>
            </TiltCard>
        </Reveal>
    );
}

export default function Projects() {
    return (
        <section id="work" className="py-24 sm:py-36 relative">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <Reveal className="mb-14 sm:mb-20">
                    <div className="flex items-end justify-between gap-6 flex-wrap">
                        <div>
                            <p className="mono-label text-mist mb-4">01 — Selected work</p>
                            <h2 className="display text-ink text-wrap-balance" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
                                Work that <em className="text-accent">ships</em>.
                            </h2>
                        </div>
                        <p className="text-mist max-w-sm leading-relaxed pb-2">
                            Three products, three real problems. None of them exist only in a
                            notes app.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <NebiansShowcase />
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-8 lg:mt-10">
                    <SmallProjectCard
                        index="02"
                        name={retra.name}
                        status={retra.status}
                        tagline={retra.tagline}
                        description={retra.description}
                        features={retra.features}
                        href={retra.links.github}
                        linkLabel="View on GitHub"
                        delay={0.05}
                        visual={
                            <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-border group/visual">
                                <Image
                                    src="/images/about-abstract.png"
                                    alt="Abstract 3D shapes in warm tones, evoking Retra's world"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/visual:scale-105"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-sand/60 via-transparent to-transparent" aria-hidden="true" />
                            </div>
                        }
                    />
                    <SmallProjectCard
                        index="03"
                        name={prody.name}
                        status={prody.status}
                        tagline={prody.tagline}
                        description={prody.description}
                        features={prody.features}
                        href={prody.links.github}
                        linkLabel="Releases"
                        delay={0.12}
                        visual={
                            <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-border bg-ash/60">
                                <div className="absolute left-1/2 -translate-x-[82%] top-4 bottom-[-24px] w-[38%] -rotate-[6deg]">
                                    <div className="relative w-full h-full overflow-hidden rounded-xl border border-border shadow-xl">
                                        <Image src={prody.images[1].src} alt={prody.images[1].alt} fill className="object-cover object-top" sizes="20vw" />
                                    </div>
                                </div>
                                <div className="absolute left-1/2 translate-x-[-8%] top-8 bottom-[-24px] w-[38%] rotate-[6deg]">
                                    <div className="relative w-full h-full overflow-hidden rounded-xl border border-border shadow-xl">
                                        <Image src={prody.images[0].src} alt={prody.images[0].alt} fill className="object-cover object-top" sizes="20vw" />
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </section>
    );
}
