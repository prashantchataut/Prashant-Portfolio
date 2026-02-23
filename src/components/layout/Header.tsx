"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Github, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "../providers/ThemeProvider";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#prody" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

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

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "py-3 bg-sand/80 backdrop-blur-xl border-b border-border"
                        : "py-5 bg-transparent"
                )}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
                    <Link href="/" className="relative z-50 text-xl font-bold tracking-tighter text-ink">
                        PC.
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-mist hover:text-ink transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-mist hover:text-ink hover:bg-ash transition-all"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        <Link
                            href="mailto:prashantchataut8@gmail.com"
                            className="px-5 py-2.5 bg-accent text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Let's Talk
                        </Link>
                    </nav>

                    {/* Mobile: Theme + Menu */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="relative z-50 p-2 text-ink"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative z-50 p-2 text-ink"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-40 bg-sand flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl font-bold tracking-tight text-ink hover:text-accent transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            className="flex gap-6 mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-ash hover:bg-accent hover:text-white transition-all"
                                >
                                    <social.icon className="w-6 h-6" />
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
