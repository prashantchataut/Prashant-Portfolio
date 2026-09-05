'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Sun, Moon, Github, Instagram } from 'lucide-react';
import { site } from '@/data/config';
import { cn } from '@/lib/utils';
import { useTheme } from '../providers/ThemeProvider';

const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Approach', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

const socialLinks = [
    { name: 'GitHub', href: site.links.github, icon: Github },
    { name: 'Instagram', href: site.links.instagram, icon: Instagram },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* scroll progress */}
            <motion.div
                style={{ scaleX: progress }}
                className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-accent z-[70]"
                aria-hidden="true"
            />

            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                    scrolled
                        ? 'py-3 bg-sand/75 backdrop-blur-xl border-b border-border'
                        : 'py-5 bg-transparent border-b border-transparent'
                )}
            >
                <div className="mx-auto max-w-6xl px-6 lg:px-8 flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-serif italic text-2xl text-ink tracking-tight hover:text-accent transition-colors"
                        aria-label="Prashant Chataut — home"
                    >
                        P<span className="text-accent">.</span>C<span className="text-accent">.</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-2" aria-label="Primary">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="link-sweep px-4 py-2 text-sm font-medium text-mist hover:text-ink transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="w-px h-5 bg-border mx-2" aria-hidden="true" />

                        {socialLinks.map(({ name, href, icon: Icon }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-mist hover:text-accent transition-colors duration-300 cursor-pointer"
                                aria-label={name}
                            >
                                <Icon size={16} />
                            </a>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-mist hover:text-accent transition-colors duration-300 cursor-pointer"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        <a
                            href={site.links.email}
                            className="ml-2 px-5 py-2.5 bg-accent text-sand rounded-full text-sm font-semibold hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                        >
                            Email
                        </a>
                    </nav>

                    <div className="flex items-center gap-1 md:hidden">
                        {socialLinks.map(({ name, href, icon: Icon }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-mist hover:text-ink transition-colors cursor-pointer"
                                aria-label={name}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-mist hover:text-ink transition-colors cursor-pointer"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-ink cursor-pointer"
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-sand/95 backdrop-blur-2xl md:hidden"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                            className="flex flex-col justify-center h-full px-8 pt-16"
                        >
                            <nav className="space-y-2" aria-label="Mobile">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.08 * i }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block py-3 display text-4xl text-ink hover:text-accent transition-colors"
                                        >
                                            <span className="mono-label text-accent mr-4">0{i + 1}</span>
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-10 flex flex-wrap gap-3"
                            >
                                {socialLinks.map(({ name, href }) => (
                                    <a
                                        key={name}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-5 py-2.5 border border-border rounded-full text-sm text-mist hover:border-accent hover:text-ink transition-all cursor-pointer"
                                    >
                                        {name}
                                    </a>
                                ))}
                                <a
                                    href={site.links.email}
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-2.5 bg-accent text-sand rounded-full text-sm font-semibold hover:bg-accent-light transition-colors cursor-pointer"
                                >
                                    Email
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
