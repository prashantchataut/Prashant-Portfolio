'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Check, Sparkles, Bot } from 'lucide-react';

type AIVerdict = 'not-slop' | 'kinda-slop' | 'full-slop';

interface Review {
    stars: number;
    text: string;
    aiVerdict: AIVerdict;
    timestamp: number;
}

function getStoredReviews(): Review[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem('prashant-reviews');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveReview(review: Review) {
    const reviews = getStoredReviews();
    reviews.push(review);
    localStorage.setItem('prashant-reviews', JSON.stringify(reviews));
}

export default function SiteReview() {
    const [stars, setStars] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [text, setText] = useState('');
    const [aiVerdict, setAiVerdict] = useState<AIVerdict | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [allReviews] = useState<Review[]>(getStoredReviews);

    const handleSubmit = () => {
        if (stars === 0 || !aiVerdict) return;

        saveReview({ stars, text: text.trim(), aiVerdict, timestamp: Date.now() });
        setSubmitted(true);

        fetch('/api/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stars, text: text.trim(), aiVerdict }),
        }).catch(() => {});
    };

    const avgStars = allReviews.length > 0
        ? (allReviews.reduce((sum, r) => sum + r.stars, 0) / allReviews.length).toFixed(1)
        : null;

    const aiVerdicts: { value: AIVerdict; label: string; icon: React.ReactNode; description: string }[] = [
        { value: 'not-slop', label: 'Not AI slop', icon: <Sparkles size={16} />, description: 'Feels human-made' },
        { value: 'kinda-slop', label: 'Kinda slop', icon: <Bot size={16} />, description: 'AI vibes but cool' },
        { value: 'full-slop', label: 'Full AI slop', icon: <Bot size={16} />, description: 'ChatGPT energy' },
    ];

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
            >
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-sand" />
                </div>
                <p className="text-ink font-serif text-lg mb-1">Got it. Roast appreciated.</p>
                <p className="text-mist text-sm">Your review has been recorded.</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm text-accent font-sans tracking-[0.2em] uppercase mb-2">Rate this site</p>
                <p className="text-mist text-sm mb-4">Be honest. I can take it.</p>
            </div>

            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        onClick={() => setStars(i)}
                        onMouseEnter={() => setHoveredStar(i)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-transform hover:scale-110"
                        aria-label={`${i} star${i > 1 ? 's' : ''}`}
                    >
                        <Star
                            size={28}
                            className={`transition-colors ${
                                i <= (hoveredStar || stars)
                                    ? 'text-accent fill-accent'
                                    : 'text-border'
                            }`}
                        />
                    </button>
                ))}
                {avgStars && (
                    <span className="text-mist text-sm ml-3">{avgStars} avg from {allReviews.length} review{allReviews.length !== 1 ? 's' : ''}</span>
                )}
            </div>

            <div>
                <p className="text-ink text-sm font-medium mb-3">AI slop or not?</p>
                <div className="flex flex-wrap gap-2">
                    {aiVerdicts.map((v) => (
                        <button
                            key={v.value}
                            onClick={() => setAiVerdict(v.value)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all ${
                                aiVerdict === v.value
                                    ? 'border-accent bg-accent/10 text-ink'
                                    : 'border-border text-mist hover:border-accent/50 hover:text-ink'
                            }`}
                        >
                            {v.icon}
                            <span>{v.label}</span>
                        </button>
                    ))}
                </div>
                {aiVerdict && (
                    <p className="text-mist/60 text-xs mt-2">
                        {aiVerdicts.find(v => v.value === aiVerdict)?.description}
                    </p>
                )}
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell me what you really think (optional)..."
                rows={3}
                className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-ink text-sm placeholder:text-mist/50 focus:outline-none focus:border-accent resize-none"
            />

            <button
                onClick={handleSubmit}
                disabled={stars === 0 || !aiVerdict}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    stars > 0 && aiVerdict
                        ? 'bg-accent text-sand hover:bg-accent-light'
                        : 'bg-border text-mist/40 cursor-not-allowed'
                }`}
            >
                <Send size={14} />
                Submit review
            </button>
        </div>
    );
}