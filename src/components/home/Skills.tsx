"use client";
import { motion } from 'framer-motion';

const skills = [
    { category: "Core", items: ["React/Next.js", "TypeScript", "Node.js", "Tailwind CSS"] },
    { category: "Design", items: ["Framer Motion", "GSAP", "UI/UX System", "Typography"] },
    { category: "Tools", items: ["Git", "Vercel", "Figma", "PostgreSQL"] },
    { category: "Thought", items: ["Systems Thinking", "Technical Writing", "Problem Solving"] }
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-ash border-t border-ink/5 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-16 md:flex md:justify-between md:items-end">
                    <div className="max-w-xl">
                        <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Expertise</p>
                        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
                            Technical <br /> &amp; Creative Toolkit.
                        </h2>
                    </div>
                    <p className="mt-6 md:mt-0 text-mist max-w-sm text-right hidden md:block">
                        A blend of engineering rigor and design intuition to build scalable products.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((group, i) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                            className="group bg-white p-8 rounded-2xl border border-ink/5 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <h3 className="relative text-xl font-medium text-ink mb-6 border-b border-ink/10 pb-2">{group.category}</h3>
                            <ul className="relative space-y-3">
                                {group.items.map((skill) => (
                                    <li key={skill} className="text-mist group-hover:text-ink transition-colors cursor-default flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-ink/50 transition-colors" />
                                        {skill}
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

