'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/data/config';

const socialLinks = [
    { name: 'GitHub', href: site.links.github },
    { name: 'Instagram', href: site.links.instagram },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="relative py-24 px-6 overflow-hidden">
            <div className="section-divider" />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-bold tracking-tighter"
                        >
                            Got a project
                            <br />
                            <span className="gradient-text">in mind?</span>
                        </motion.h2>
                        <p className="text-xl text-mist max-w-md leading-relaxed">
                            I&apos;m usually up for it. Drop me a line.
                        </p>
                    </div>

                    <div className="flex flex-col justify-end items-start md:items-end gap-6">
                        <Link
                            href={site.links.email}
                            className="group text-xl md:text-2xl font-medium text-ink hover:text-accent transition-colors duration-300 flex items-center gap-3"
                        >
                            prashantchataut8@gmail.com
                            <ArrowUpRight size={20} className="text-mist group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </Link>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.div
                                    key={social.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-full border border-border text-sm text-mist hover:border-accent/30 hover:text-ink hover:bg-accent/5 transition-all duration-300"
                                    >
                                        {social.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-mist/60">
                    <p>&copy; {currentYear} Prashant Chataut. /pruh-SHAANT/</p>
                    <p>Built at 17.</p>
                </div>
            </div>
        </footer>
    );
}