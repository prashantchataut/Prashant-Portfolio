'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, RotateCcw, Download, Award, ChevronDown } from 'lucide-react';
import { useSpeechRecognition } from '@/lib/speech/useSpeechRecognition';
import { pronunciation, hero } from '@/data/content';

function checkPronunciation(transcript: string): boolean {
    const normalized = transcript.toLowerCase().trim();
    return pronunciation.acceptableAttempts.some(
        (attempt) => {
            const normalizedAttempt = attempt.toLowerCase().trim();
            return normalized === normalizedAttempt
                || normalized.includes(normalizedAttempt)
                || normalizedAttempt.includes(normalized)
                || levenshtein(normalized, normalizedAttempt) <= 3;
        }
    );
}

function levenshtein(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1,
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

type PronunciationState = 'idle' | 'listening' | 'success' | 'roast';

export default function NameHero() {
    const { transcript, isListening, isSupported, startListening, stopListening, error, reset } = useSpeechRecognition();
    const [state, setState] = useState<PronunciationState>('idle');
    const [roast, setRoast] = useState('');
    const [roastLoading, setRoastLoading] = useState(false);
    const [tapCount, setTapCount] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [stats, setStats] = useState({ total: 847, correct: 312 });
    const nameRef = useRef<HTMLHeadingElement>(null);
    const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => setStats({ total: data.totalAttempts, correct: data.correctAttempts }))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!transcript) return;

        if (checkPronunciation(transcript)) {
            setState('success');
            setStats(prev => ({ total: prev.total + 1, correct: prev.correct + 1 }));
            fetch('/api/stats', { method: 'POST' }).catch(() => {});
        } else {
            setState('roast');
            setRoastLoading(true);
            fetch('/api/roast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ attempt: transcript }),
            })
                .then(res => res.json())
                .then(data => {
                    setRoast(data.roast);
                    setRoastLoading(false);
                })
                .catch(() => {
                    setRoast("Even the roast generator is speechless at how badly you mangled that. Try again.");
                    setRoastLoading(false);
                });
            setStats(prev => ({ total: prev.total + 1, correct: prev.correct }));
        }
    }, [transcript]);

    const handleMicClick = useCallback(() => {
        if (state === 'success' || state === 'roast') {
            reset();
            setState('idle');
            setRoast('');
            return;
        }
        if (isListening) {
            stopListening();
        } else {
            startListening();
            setState('listening');
        }
    }, [state, isListening, startListening, stopListening, reset]);

    const handleNameTap = useCallback(() => {
        setTapCount(prev => {
            const newCount = prev + 1;
            if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
            if (newCount >= 3) {
                setShowEasterEgg(true);
                setTimeout(() => setShowEasterEgg(false), 5000);
                return 0;
            }
            tapTimerRef.current = setTimeout(() => setTapCount(0), 500);
            return newCount;
        });
    }, []);

    return (
        <section
            id="pronunciation-section"
            className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-16"
        >
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,var(--ink)_1px,transparent_1px),linear-gradient(to_bottom,var(--ink)_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="text-sm tracking-[0.3em] uppercase text-accent font-sans mb-8"
                >
                    {hero.greeting}
                </motion.p>

                <motion.h1
                    ref={nameRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
                    onClick={handleNameTap}
                    className="text-[clamp(3rem,12vw,9rem)] font-serif leading-[0.9] text-ink tracking-tight cursor-default select-none mb-4"
                >
                    Prashant
                    <br />
                    <span className="text-mist">Chataut.</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    className="mb-6"
                >
                    <span className="text-3xl sm:text-4xl text-accent font-serif tracking-tight">
                        {pronunciation.phonetic}
                    </span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-mist text-lg sm:text-xl max-w-xl leading-relaxed mb-12"
                >
                    {pronunciation.hint}
                </motion.p>

                <AnimatePresence mode="wait">
                    {state === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-start gap-6"
                        >
                            <button
                                onClick={handleMicClick}
                                disabled={!isSupported}
                                className="group flex items-center gap-4 px-8 py-4 border-2 border-accent text-ink hover:bg-accent hover:text-sand transition-all duration-300 rounded-full text-lg font-medium"
                            >
                                <Mic size={24} className="group-hover:scale-110 transition-transform" />
                                <span>{isSupported ? 'Try saying it' : 'Speech recognition not available in this browser'}</span>
                            </button>

                            <p className="text-sm text-mist">
                                {stats.correct} of {stats.total} people got it right
                            </p>
                        </motion.div>
                    )}

                    {state === 'listening' && (
                        <motion.div
                            key="listening"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-start gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-30" />
                                    <div className="relative w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                                        <Mic size={28} className="text-sand" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-ink text-lg font-medium">Listening...</p>
                                    <p className="text-mist text-sm">Say &quot;Prashant Chataut&quot;</p>
                                </div>
                            </div>
                            <button
                                onClick={stopListening}
                                className="px-6 py-2 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full text-sm"
                            >
                                <MicOff size={14} className="inline mr-2" />
                                Stop listening
                            </button>
                        </motion.div>
                    )}

                    {state === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-start gap-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                                    <Award size={24} className="text-sand" />
                                </div>
                                <div>
                                    <p className="text-ink text-xl font-serif">You said it right.</p>
                                    <p className="text-mist text-sm">Most people don&apos;t. You&apos;re officially certified.</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => generateCertificate()}
                                    className="flex items-center gap-2 px-6 py-3 bg-accent text-sand rounded-full text-sm font-medium hover:bg-accent-light transition-colors"
                                >
                                    <Download size={16} />
                                    Get your certificate
                                </button>
                                <button
                                    onClick={handleMicClick}
                                    className="flex items-center gap-2 px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full text-sm"
                                >
                                    <RotateCcw size={14} />
                                    Try again
                                </button>
                            </div>

                            <p className="text-sm text-mist">
                                {stats.correct} of {stats.total} people got it right
                            </p>
                        </motion.div>
                    )}

                    {state === 'roast' && (
                        <motion.div
                            key="roast"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-start gap-4 max-w-lg"
                        >
                            <div className="bg-surface-elevated border border-border rounded-2xl p-6">
                                {roastLoading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
                                        <p className="text-mist italic">Crafting your roast...</p>
                                    </div>
                                ) : (
                                    <p className="text-ink text-lg leading-relaxed">{roast}</p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={handleMicClick}
                                    className="flex items-center gap-2 px-6 py-3 bg-accent text-sand rounded-full text-sm font-medium hover:bg-accent-light transition-colors"
                                >
                                    <Mic size={14} />
                                    Try again, I believe in you
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-500 mt-4"
                    >
                        {error}
                    </motion.p>
                )}
            </div>

            <AnimatePresence>
                {showEasterEgg && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-surface border border-accent rounded-2xl px-8 py-4 shadow-lg z-50"
                    >
                        <p className="text-ink text-sm font-medium">{pronunciation.easterEgg.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <ChevronDown size={24} className="text-mist/40 animate-bounce" />
            </motion.div>
        </section>
    );
}

async function generateCertificate() {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFillColor(250, 247, 242);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    doc.setTextColor(26, 22, 18);
    doc.text('Certificate of Pronunciation Competence', pageWidth / 2, 60, { align: 'center' });

    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 60, 68, pageWidth / 2 + 60, 68);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(138, 128, 120);
    doc.text('This certifies that the bearer has successfully pronounced', pageWidth / 2, 90, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(26, 22, 18);
    doc.text('"Prashant Chataut"', pageWidth / 2, 110, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(138, 128, 120);
    doc.text('/pruh-SHAANT chuh-TOUT/', pageWidth / 2, 125, { align: 'center' });

    doc.setFontSize(12);
    doc.text(
        'Demonstrating phonetic abilities that place them in the top percentile of the general population.',
        pageWidth / 2, 140, { align: 'center' }
    );

    doc.setFontSize(11);
    doc.setTextColor(138, 128, 120);
    doc.text(`Issued: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, 160, { align: 'center' });

    doc.setFontSize(10);
    doc.text('Send this certificate to Prashant for something special.', pageWidth / 2, 175, { align: 'center' });

    doc.save('prashant-pronunciation-certificate.pdf');
}