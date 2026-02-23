"use client";
import { motion } from 'framer-motion';

const skillGroups = [
    {
        title: "Foundation",
        description: "The core technologies that power my engineering.",
        skills: ["React 18", "Next.js 14", "TypeScript", "Node.js", "PostgreSQL"]
    },
    {
        title: "Expression",
        description: "Tools for visual storytelling and interaction.",
        skills: ["Tailwind CSS", "Framer Motion", "GSAP", "Three.js (R3F)", "Figma"]
    },
    {
        title: "Arsenal",
        description: "DevOps and productivity workflow.",
        skills: ["Git/GitHub", "Vercel", "Docker", "VS Code", "Linear"]
    }
];

export default function Skills() {
    return (
        <section id="skills" className="py-32 bg-ash border-t border-border relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-accent/5 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mb-20 md:flex md:justify-between md:items-end">
                    <div className="max-w-xl">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 font-mono">My Toolkit</p>
                        <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter text-ink">
                            Engineered for <br />Performance.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {skillGroups.map((group, i) => (
                        <motion.div
                            key={group.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-surface p-10 rounded-2xl border border-border hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 group"
                        >
                            <h3 className="text-2xl font-bold text-ink mb-2 group-hover:text-accent transition-colors">{group.title}</h3>
                            <p className="text-mist text-sm mb-8">{group.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 bg-ash text-ink text-xs font-medium rounded-full border border-border group-hover:border-accent/20 group-hover:bg-accent/5 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
