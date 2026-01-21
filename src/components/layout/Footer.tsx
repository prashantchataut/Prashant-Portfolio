"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Github } from 'lucide-react';

const socialLinks = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/prashantchataut_/',
        icon: Instagram,
    },
    {
        name: 'GitHub',
        href: 'https://github.com/prashantchataut',
        icon: Github,
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-ink text-sand py-20 px-6 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-6">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                            Let's work <br />
                            <span className="text-mist">together.</span>
                        </h2>
                        <p className="text-xl text-sand/80 max-w-md">
                            Available for freelance projects and open to new opportunities.
                        </p>
                    </div>

                    <div className="flex flex-col justify-end items-start md:items-end gap-4">
                        <Link
                            href="mailto:prashantchataut8@gmail.com"
                            className="text-2xl md:text-3xl font-medium hover:text-mist transition-colors underline decoration-1 underline-offset-8"
                        >
                            prashantchataut8@gmail.com
                        </Link>
                        <div className="flex gap-6 mt-4">
                            {socialLinks.map((social) => (
                                <motion.div
                                    key={social.name}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2 text-lg hover:text-mist transition-colors uppercase tracking-wide"
                                    >
                                        <social.icon className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                        {social.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-sand/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sand/60">
                    <p>&copy; {currentYear} Prashant Chataut.</p>
                    <p>Designed &amp; Built with passion.</p>
                </div>
            </div>
        </footer>
    );
}
