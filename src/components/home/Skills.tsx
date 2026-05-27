'use client';

import { motion } from 'framer-motion';

const allSkills = [
    "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Python",
    "Tailwind CSS", "Framer Motion", "React Native", "Figma", "Git", "Docker",
    "Claude", "Canva"
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
            <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10 flex flex-col md:flex-row gap-12 md:gap-20 items-start">
                <div className="shrink-0 md:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-5xl font-serif text-ink tracking-tight mb-6">
                            What I work with.
                        </h2>
                        <p className="text-mist text-base leading-relaxed">
                            Tools for building with performance, aesthetics, and scale in mind.
                        </p>
                    </motion.div>
                </div>

                <div className="w-full flex-grow flex flex-wrap gap-3 pt-2">
                    {allSkills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.03, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                            className="px-5 py-2.5 border border-border text-mist text-sm font-medium rounded-full transition-all duration-300 hover:border-accent/40 hover:text-ink hover:bg-surface-elevated"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
}