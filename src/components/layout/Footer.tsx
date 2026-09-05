'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send, Check } from 'lucide-react';
import { site } from '@/data/config';
import SiteReview from './SiteReview';
import Reveal from '@/components/ui/Reveal';

const socialLinks = [
    { name: 'GitHub', href: site.links.github },
    { name: 'Instagram', href: site.links.instagram },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
            });

            if (res.ok) {
                setFormState('sent');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setFormState('error');
            }
        } catch {
            setFormState('error');
        }
    };

    const inputClass =
        'w-full px-4 py-3.5 bg-surface-elevated/80 border border-border rounded-xl text-ink text-sm placeholder:text-mist/50 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-glow)] transition-all';

    return (
        <footer id="contact" className="relative pt-24 sm:pt-36 overflow-hidden">
            <div className="section-divider absolute inset-x-0 top-0" />

            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full blur-[130px] pointer-events-none"
                style={{ background: 'var(--accent-glow)' }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    <div>
                        <Reveal>
                            <p className="mono-label text-mist mb-6">05 — Contact</p>
                            <h2 className="display text-ink" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
                                Want to <em className="text-accent">talk?</em>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="text-lg sm:text-xl text-mist max-w-md leading-relaxed mt-6">
                                Email or the form. I reply when I can.
                            </p>
                        </Reveal>

                        <Reveal delay={0.18} className="flex flex-wrap gap-3 pt-8">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group px-5 py-2.5 rounded-full border border-border text-sm text-mist hover:border-accent/50 hover:text-ink hover:bg-accent/5 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    {social.name}
                                    <ArrowUpRight size={13} className="inline ml-1.5 -mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                                </Link>
                            ))}
                            <a
                                href={site.links.email}
                                className="link-sweep px-2 py-2.5 text-sm text-mist hover:text-accent transition-colors"
                            >
                                prashantchataut8@gmail.com
                            </a>
                        </Reveal>
                    </div>

                    <Reveal delay={0.12}>
                        {formState === 'sent' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-4 p-8 bg-surface border border-accent/25 rounded-3xl"
                            >
                                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shrink-0 glow-sm">
                                    <Check size={22} className="text-sand" />
                                </div>
                                <div>
                                    <p className="text-ink font-medium text-lg">Sent.</p>
                                    <p className="text-mist text-sm">I&apos;ll reply when I can.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="sr-only" htmlFor="contact-name">Name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        required
                                        className={inputClass}
                                    />
                                    <label className="sr-only" htmlFor="contact-email">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <label className="sr-only" htmlFor="contact-message">Message</label>
                                <textarea
                                    id="contact-message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Message"
                                    required
                                    rows={5}
                                    className={`${inputClass} resize-none`}
                                />
                                <button
                                    type="submit"
                                    disabled={formState === 'sending'}
                                    className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-accent text-sand rounded-full text-sm font-semibold hover:bg-accent-light transition-all duration-300 hover:-translate-y-0.5 glow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    {formState === 'sending' ? 'Sending...' : 'Send it'}
                                </button>
                                {formState === 'error' && (
                                    <p className="text-sm text-red-400">Didn&apos;t send. Try again or email me.</p>
                                )}
                            </form>
                        )}
                    </Reveal>
                </div>

                <div className="border-t border-border pt-12 mb-12">
                    <SiteReview />
                </div>

                <div className="border-t border-border pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-mist/70">
                    <p>&copy; {currentYear} Prashant Chataut</p>
                    <p className="flex items-center gap-2">
                        Building in Nepal.
                        <Link
                            href="/writes"
                            className="link-sweep text-mist hover:text-accent transition-colors"
                        >
                            Writes
                        </Link>
                    </p>
                </div>
            </div>

            {/* watermark */}
            <div className="relative h-[16vw] min-h-[90px] select-none pointer-events-none overflow-hidden" aria-hidden="true">
                <p
                    className="text-stroke display absolute left-1/2 -translate-x-1/2 bottom-[-4vw] whitespace-nowrap leading-none opacity-70"
                    style={{ fontSize: 'clamp(4rem, 14vw, 15rem)' }}
                >
                    PRASHANT
                </p>
            </div>
        </footer>
    );
}
