'use client';

import { motion } from 'framer-motion';

const approaches = [
    {
        title: "Defaults.",
        items: [
            "Start from the problem someone has today",
            "Ship a rough version before polishing forever",
            "If it needs a long tutorial, the UI is wrong",
        ],
    },
    {
        title: "Tools.",
        items: [
            "TypeScript, React, Next.js, React Native",
            "Kotlin, Jetpack Compose, Node.js, PostgreSQL",
            "Tailwind, Framer Motion, Figma",
        ],
    },
    {
        title: "Focus.",
        items: [
            "School and study apps for Nepal",
            "Emulators and game tooling",
            "Apps that don't spam you",
        ],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 sm:py-32 relative">
            <div className="section-divider" />

            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl sm:text-6xl font-serif text-ink tracking-tight text-wrap-balance">
                        Approach.
                    </h2>
                    <p className="text-mist text-lg mt-4 max-w-xl">
                        How I pick what to build, and what I reach for when I do.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
                    {approaches.map((section, i) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <h3 className="text-lg font-serif text-ink mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.items.map((item) => (
                                    <li key={item} className="text-mist text-sm leading-relaxed">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}