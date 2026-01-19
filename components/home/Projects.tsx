"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const projects = [
    {
        title: "NeverZero",
        category: "Productivty Application",
        year: "2024",
        link: "https://github.com/prashantchataut/NeverZero",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2672&auto=format&fit=crop"
    },
    {
        title: "Portfolio V1",
        category: "Design System",
        year: "2023",
        link: "https://github.com/prashantchataut",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2664&auto=format&fit=crop"
    },
    {
        title: "Echo Brand",
        category: "Identity & Strategy",
        year: "2023",
        link: "#",
        image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "Lumina Interface",
        category: "UI Kit / Web",
        year: "2022",
        link: "#",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    }
];

export default function Projects() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    return (
        <section id="projects" className="py-32 bg-sand relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-20 flex flex-col md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Selected Work</p>
                    <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
                        Featured <br /> Projects.
                    </h2>
                </div>
                <div className="hidden md:block">
                    <Link href="https://github.com/prashantchataut" className="group flex items-center gap-2 text-ink font-medium">
                        View All Repositories
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col">
                {projects.map((project, index) => (
                    <Link
                        href={project.link}
                        key={index}
                        className="group relative border-t border-ink/10 py-12 md:py-16 transition-colors hover:bg-white/50"
                        onMouseEnter={() => setHoveredProject(index)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 z-10 relative">
                            <h3 className="text-3xl md:text-5xl font-medium text-ink group-hover:translate-x-4 transition-transform duration-500 ease-out">
                                {project.title}
                            </h3>
                            <div className="flex items-center gap-8 md:gap-16 text-mist group-hover:text-ink transition-colors">
                                <span className="text-sm md:text-base">{project.category}</span>
                                <span className="text-sm md:text-base">{project.year}</span>
                            </div>
                        </div>

                        {/* Mobile Image (Always visible usually? or just hidden. For now hidden on desktop hover reveal pattern) */}
                        <div className="mt-6 md:hidden rounded-lg overflow-hidden h-64 w-full relative">
                            <Image src={project.image} alt={project.title} fill className="object-cover" />
                        </div>
                    </Link>
                ))}
                <div className="border-t border-ink/10" />
            </div>

            {/* Desktop Hover Image Reveal */}
            <div className="pointer-events-none fixed z-20 top-0 left-0 w-full h-full hidden md:flex items-center justify-center mix-blend-multiply">
                <AnimatePresence>
                    {hoveredProject !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.6, scale: 1, rotate: Math.random() * 4 - 2 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative w-[500px] h-[350px] rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={projects[hoveredProject].image}
                                alt={projects[hoveredProject].title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
