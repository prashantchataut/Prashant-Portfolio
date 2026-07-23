'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send, Check } from 'lucide-react';
import { site } from '@/data/config';
import SiteReview from './SiteReview';

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
                            Want to talk?
                        </motion.h2>
                        <p className="text-xl text-mist max-w-md leading-relaxed">
                            Email or the form. I reply when I can.
                        </p>

                        <div className="flex gap-4 pt-2">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-full border border-border text-sm text-mist hover:border-accent/30 hover:text-ink hover:bg-accent/5 transition-all duration-300"
                                >
                                    {social.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-start">
                        {formState === 'sent' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 p-6 bg-surface border border-accent/20 rounded-2xl"
                            >
                                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shrink-0">
                                    <Check size={20} className="text-sand" />
                                </div>
                                <div>
                                    <p className="text-ink font-medium">Sent.</p>
                                    <p className="text-mist text-sm">I&apos;ll reply when I can.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        required
                                        className="px-4 py-3 bg-surface-elevated border border-border rounded-xl text-ink text-sm placeholder:text-mist/50 focus:outline-none focus:border-accent transition-colors"
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                        className="px-4 py-3 bg-surface-elevated border border-border rounded-xl text-ink text-sm placeholder:text-mist/50 focus:outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-ink text-sm placeholder:text-mist/50 focus:outline-none focus:border-accent resize-none transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={formState === 'sending'}
                                    className="flex items-center gap-2 px-6 py-3 bg-accent text-sand rounded-full text-sm font-medium hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={14} />
                                    {formState === 'sending' ? 'Sending...' : 'Send'}
                                </button>
                                {formState === 'error' && (
                                    <p className="text-sm text-red-500">Didn&apos;t send. Try again or email me.</p>
                                )}
                            </form>
                        )}

                        <div className="mt-6">
                            <a
                                href={site.links.email}
                                className="group text-sm text-mist hover:text-accent transition-colors duration-300 flex items-center gap-2"
                            >
                                prashantchataut8@gmail.com
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-12 mb-12">
                    <SiteReview />
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-mist/60">
                    <p>&copy; {currentYear} Prashant Chataut</p>
                    <p className="flex items-center gap-1.5">
                        Building in Nepal.
                        <Link href="/writes" className="inline-block w-1.5 h-1.5 rounded-full bg-mist/30 hover:bg-accent transition-colors duration-500" aria-label="Writes" />
                    </p>
                </div>
            </div>
        </footer>
    );
}