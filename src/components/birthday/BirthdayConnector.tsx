'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, MessageCircle, Instagram, Send, Pencil } from 'lucide-react';
import { birthday } from '@/data/content';

function isBirthdayWeek(): boolean {
    const now = new Date();
    const bday = new Date(birthday.date);
    bday.setFullYear(now.getFullYear());
    const diffDays = Math.abs(Math.floor((now.getTime() - bday.getTime()) / (1000 * 60 * 60 * 24)));
    return diffDays <= birthday.celebrationDurationDays;
}

export default function BirthdayConnector() {
    const [isCelebration, setIsCelebration] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
    const [customMessage, setCustomMessage] = useState('');
    const [isCustom, setIsCustom] = useState(false);

    useEffect(() => {
        setIsCelebration(isBirthdayWeek());
    }, []);

    const getMessage = () => {
        if (isCustom && customMessage.trim()) return customMessage.trim();
        if (selectedMessage !== null) return birthday.preMessages[selectedMessage];
        return '';
    };

    const whatsappUrl = `https://wa.me/${birthday.whatsappNumber}?text=${encodeURIComponent(getMessage())}`;

    if (!isCelebration) {
        return (
            <section className="py-8 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 text-mist">
                        <span className="text-sm font-sans tracking-wide">{birthday.age} years old. Building in Nepal.</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface border-2 border-accent/30 rounded-2xl p-8 sm:p-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
                        className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <Cake size={28} className="text-sand" />
                    </motion.div>

                    <h3 className="text-2xl sm:text-3xl font-serif text-ink mb-3 text-center">
                        HEY IT&apos;S MY BIRTHDAY! 🎂
                    </h3>
                    <p className="text-mist text-lg mb-8 max-w-md mx-auto text-center">
                        {birthday.message}
                    </p>

                    <div className="max-w-lg mx-auto">
                        <p className="text-sm text-mist mb-3 font-medium">
                            Pick a message or write your own:
                        </p>

                        <div className="space-y-2 mb-4">
                            {birthday.preMessages.map((msg, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setSelectedMessage(i); setIsCustom(false); }}
                                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                                        selectedMessage === i && !isCustom
                                            ? 'border-accent bg-accent/10 text-ink'
                                            : 'border-border text-mist hover:border-accent/50 hover:text-ink'
                                    }`}
                                >
                                    {msg}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => { setIsCustom(true); setSelectedMessage(null); }}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-2 ${
                                isCustom
                                    ? 'border-accent bg-accent/10 text-ink'
                                    : 'border-dashed border-border text-mist hover:border-accent/50 hover:text-ink'
                            }`}
                        >
                            <Pencil size={14} />
                            Write your own message
                        </button>

                        <AnimatePresence>
                            {isCustom && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <textarea
                                        value={customMessage}
                                        onChange={(e) => setCustomMessage(e.target.value)}
                                        placeholder="Type your birthday message here..."
                                        className="w-full mt-3 px-4 py-3 bg-surface-elevated border border-border rounded-xl text-ink text-sm placeholder:text-mist/50 focus:outline-none focus:border-accent resize-none"
                                        rows={3}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                            <a
                                href={getMessage() ? whatsappUrl : `https://wa.me/${birthday.whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-sm font-medium transition-opacity ${
                                    !getMessage() && !isCustom ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                                }`}
                            >
                                <MessageCircle size={16} />
                                Send on WhatsApp
                            </a>
                            <a
                                href={birthday.instagramLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full text-sm font-medium"
                            >
                                <Instagram size={16} />
                                Instagram DM
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}