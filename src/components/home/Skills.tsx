'use client';

import Reveal from '@/components/ui/Reveal';
import Marquee from '@/components/ui/Marquee';

const approaches = [
    {
        title: 'Defaults.',
        items: [
            'Start from the problem someone has today',
            'Ship a rough version before polishing forever',
            "If it needs a long tutorial, the UI is wrong",
        ],
    },
    {
        title: 'Tools.',
        items: [
            'TypeScript, React, Next.js, React Native',
            'Kotlin, Jetpack Compose, Node.js, PostgreSQL',
            'Tailwind, Framer Motion, Figma',
        ],
    },
    {
        title: 'Focus.',
        items: [
            'School and study apps for Nepal',
            'Emulators and game tooling',
            "Apps that don't spam you",
        ],
    },
];

const toolbelt = [
    'TypeScript',
    'Kotlin',
    'React Native',
    'Next.js',
    'Jetpack Compose',
    'Node.js',
    'PostgreSQL',
    'Tailwind',
    'Framer Motion',
    'Three.js',
    'mGBA',
    'Figma',
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 sm:py-36 relative overflow-hidden">
            <div className="section-divider absolute inset-x-0 top-0" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <Reveal className="mb-14 sm:mb-20">
                    <div className="flex items-end justify-between gap-6 flex-wrap">
                        <div>
                            <p className="mono-label text-mist mb-4">04 — Approach</p>
                            <h2 className="display text-ink text-wrap-balance" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
                                How I pick <em className="text-accent">&amp; build</em>.
                            </h2>
                        </div>
                        <p className="text-mist max-w-sm leading-relaxed pb-2">
                            Defaults I fall back on, tools I reach for, and the problems I
                            care about.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
                    {approaches.map((section, i) => (
                        <Reveal key={section.title} delay={0.08 * i}>
                            <div className="relative pl-6">
                                <span className="absolute left-0 top-1.5 bottom-2 w-px bg-gradient-to-b from-accent to-transparent" aria-hidden="true" />
                                <h3 className="text-xl sm:text-2xl display text-ink mb-5">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3.5">
                                    {section.items.map((item) => (
                                        <li key={item} className="text-mist text-sm sm:text-[15px] leading-relaxed flex gap-3">
                                            <span className="text-accent/70 mt-px" aria-hidden="true">✦</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            <div className="mt-20 sm:mt-28 border-y border-border bg-surface/40 backdrop-blur-sm">
                <Marquee duration={40} className="py-6">
                    {toolbelt.map((tool) => (
                        <span key={tool} className="flex items-center">
                            <span className="px-8 display text-2xl sm:text-4xl text-mist group-hover:text-ink">
                                {tool}
                            </span>
                            <span className="text-accent text-sm" aria-hidden="true">
                                ✦
                            </span>
                        </span>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
