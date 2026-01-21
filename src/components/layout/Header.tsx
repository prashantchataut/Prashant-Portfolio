"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticButton from "../ui/MagneticButton";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
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
                        ? "py-4 bg-sand/80 backdrop-blur-lg shadow-sm"
                        : "py-6 bg-transparent"
                )}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
                    <Link href="/" className="relative z-50 text-xl font-bold tracking-tighter text-ink mix-blend-exclusion">
                        PC.
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <MagneticButton key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </MagneticButton>
                        ))}
                        <MagneticButton>
                            <Link
                                href="mailto:prashantchataut8@gmail.com"
                                className="px-5 py-2.5 bg-ink text-sand rounded-full text-sm font-medium hover:bg-slate transition-colors"
                            >
                                Let's Talk
                            </Link>
                        </MagneticButton>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative z-50 p-2 text-ink"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
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
                                        className="text-4xl font-bold tracking-tight text-ink hover:text-mist transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Social Links in Mobile Menu */}
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
                                    className="p-3 rounded-full bg-ink/5 hover:bg-ink hover:text-sand transition-all"
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

