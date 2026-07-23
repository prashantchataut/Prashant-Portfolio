'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    scrolled
                        ? 'py-3 bg-sand/80 backdrop-blur-xl border-b border-border'
                        : 'py-5 bg-transparent'
                )}
            >
                <div className="mx-auto max-w-5xl px-6 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tighter gradient-text">
                        PC.
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 rounded-full text-sm font-medium text-mist hover:text-ink hover:bg-surface-elevated transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="w-px h-5 bg-border mx-2" />

                        {socialLinks.map(({ name, href, icon: Icon }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-mist hover:text-ink hover:bg-surface-elevated transition-all duration-300 cursor-pointer"
                                aria-label={name}
                            >
                                <Icon size={16} />
                            </a>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-mist hover:text-ink hover:bg-surface-elevated transition-all duration-300 cursor-pointer"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        <a
                            href={site.links.email}
                            className="ml-2 px-5 py-2.5 border border-border text-mist rounded-full text-sm font-medium hover:border-accent hover:text-ink transition-all duration-300 cursor-pointer"
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
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-sand/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 + i * 0.08 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-bold tracking-tight text-ink hover:text-accent transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-4 mt-12"
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
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6"
                        >
                            <a
                                href={site.links.email}
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-3 border border-border text-mist rounded-full text-sm font-medium hover:border-accent hover:text-ink transition-colors cursor-pointer"
                            >
                                Email
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
