'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Check } from 'lucide-react';

interface Review {
    stars: number;
    text: string;
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
    const [submitted, setSubmitted] = useState(false);
    const [allReviews] = useState<Review[]>(getStoredReviews);

    const handleSubmit = () => {
        if (stars === 0) return;

        saveReview({ stars, text: text.trim(), timestamp: Date.now() });
        setSubmitted(true);

        fetch('/api/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stars, text: text.trim() }),
        }).catch(() => {});
    };

    const avgStars =
        allReviews.length > 0
            ? (allReviews.reduce((sum, r) => sum + r.stars, 0) / allReviews.length).toFixed(1)
            : null;

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
                <p className="text-ink font-serif text-lg mb-1">Thanks.</p>
                <p className="text-mist text-sm">Saved.</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <p className="text-ink font-medium mb-1">Rate the site</p>
                <p className="text-mist text-sm mb-4">Optional. Stars are enough.</p>
            </div>

            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setStars(i)}
                        onMouseEnter={() => setHoveredStar(i)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-transform hover:scale-110 cursor-pointer"
                        aria-label={`${i} star${i > 1 ? 's' : ''}`}
                    >
                        <Star
                            size={28}
                            className={`transition-colors ${
                                i <= (hoveredStar || stars) ? 'text-accent fill-accent' : 'text-border'
                            }`}
                        />
                    </button>
                ))}
                {avgStars && (
                    <span className="text-mist text-sm ml-3">
                        {avgStars} avg from {allReviews.length} review
                        {allReviews.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Anything you want to say (optional)"
                rows={3}
                className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-ink text-sm placeholder:text-mist/50 focus:outline-none focus:border-accent resize-none"
            />

            <button
                type="button"
                onClick={handleSubmit}
                disabled={stars === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    stars > 0
                        ? 'bg-accent text-sand hover:bg-accent-light'
                        : 'bg-border text-mist/40 cursor-not-allowed'
                }`}
            >
                <Send size={14} />
                Send
            </button>
        </div>
    );
}
