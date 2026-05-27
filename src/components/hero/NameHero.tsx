'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, RotateCcw, Download, Award, ChevronDown, Volume2, Keyboard, ShieldAlert, Skull } from 'lucide-react';
import { useSpeechRecognition } from '@/lib/speech/useSpeechRecognition';
import { pronunciation, hero } from '@/data/content';

function checkPronunciation(transcript: string, confidence: number, alternatives: Array<{ transcript: string; confidence: number }>): boolean {
    const allAttempts = [
        { transcript: transcript.toLowerCase().trim(), confidence },
        ...alternatives.map(a => ({ transcript: a.transcript.toLowerCase().trim(), confidence: a.confidence })),
    ];

    for (const attempt of allAttempts) {
        if (pronunciation.wrongAttempts.some(w => attempt.transcript.includes(w) || w.includes(attempt.transcript))) {
            continue;
        }

        if (attempt.confidence < 0.85) {
            continue;
        }

        if (pronunciation.acceptableAttempts.some(acceptable => attempt.transcript === acceptable.toLowerCase().trim())) {
            return true;
        }
    }

    return false;
}

type PronunciationState = 'idle' | 'listening' | 'success' | 'roast';

function FlickerWord({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="inline-block text-accent"
            >
                {words[index]}
            </motion.span>
        </AnimatePresence>
    );
}

export default function NameHero() {
    const { transcript, confidence, alternatives, isListening, isSupported, startListening, stopListening, error, reset } = useSpeechRecognition();
    const [state, setState] = useState<PronunciationState>('idle');
    const [roast, setRoast] = useState('');
    const [roastLoading, setRoastLoading] = useState(false);
    const [tapCount, setTapCount] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [stats, setStats] = useState({ total: 847, correct: 312 });
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [typedAttempt, setTypedAttempt] = useState('');
    const [heardText, setHeardText] = useState('');
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [pendingRoast, setPendingRoast] = useState<{ transcript: string; confidence: number; alternatives: Array<{ transcript: string; confidence: number }> } | null>(null);
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

        setHeardText(transcript);

        if (checkPronunciation(transcript, confidence, alternatives)) {
            setState('success');
            setStats(prev => ({ total: prev.total + 1, correct: prev.correct + 1 }));
            fetch('/api/stats', { method: 'POST' }).catch(() => {});
        } else {
            setHeardText(transcript);
            setPendingRoast({ transcript, confidence, alternatives });
            setShowDisclaimer(true);
        }
    }, [transcript]);

    const handleTypedSubmit = useCallback(() => {
        if (!typedAttempt.trim()) return;

        setHeardText(typedAttempt.trim());

        const normalized = typedAttempt.toLowerCase().trim();

        if (pronunciation.wrongAttempts.some(w => normalized.includes(w) || w.includes(normalized))) {
            setState('roast');
            setRoastLoading(true);
            fetch('/api/roast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ attempt: typedAttempt.trim() }),
            })
                .then(res => res.json())
                .then(data => { setRoast(data.roast); setRoastLoading(false); })
                .catch(() => { setRoast("Even the roast generator is speechless at how badly you mangled that. Try again."); setRoastLoading(false); });
            setStats(prev => ({ total: prev.total + 1, correct: prev.correct }));
            return;
        }

        if (pronunciation.acceptableAttempts.some(a => normalized === a.toLowerCase().trim())) {
            setState('success');
            setStats(prev => ({ total: prev.total + 1, correct: prev.correct + 1 }));
            fetch('/api/stats', { method: 'POST' }).catch(() => {});
        } else {
            setHeardText(typedAttempt.trim());
            setPendingRoast({ transcript: typedAttempt.trim(), confidence: 1, alternatives: [] });
            setShowDisclaimer(true);
        }
    }, [typedAttempt]);

    const handleMicClick = useCallback(() => {
        if (state === 'success' || state === 'roast') {
            reset();
            setState('idle');
            setRoast('');
            setHeardText('');
            setPendingRoast(null);
            setShowDisclaimer(false);
            return;
        }
        if (isListening) {
            stopListening();
        } else {
            startListening();
            setState('listening');
        }
    }, [state, isListening, startListening, stopListening, reset]);

    const handlePlayAudio = useCallback(() => {
        const audio = new Audio(pronunciation.audioSrc);
        audio.play().catch(() => {});
    }, []);

    const handleAcceptDisclaimer = useCallback(() => {
        setShowDisclaimer(false);
        setState('roast');
        setRoastLoading(true);
        const attempt = pendingRoast?.transcript || heardText;
        fetch('/api/roast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ attempt, spicy: true }),
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
    }, [pendingRoast, heardText]);

    const handleDeclineDisclaimer = useCallback(() => {
        setShowDisclaimer(false);
        setState('roast');
        setRoastLoading(true);
        const attempt = pendingRoast?.transcript || heardText;
        fetch('/api/roast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ attempt, spicy: false }),
        })
            .then(res => res.json())
            .then(data => {
                setRoast(data.roast);
                setRoastLoading(false);
            })
            .catch(() => {
                setRoast("that wasn't even close, you sad, unrefined nobody. keep struggling with basic human skills.");
                setRoastLoading(false);
            });
        setStats(prev => ({ total: prev.total + 1, correct: prev.correct }));
    }, [pendingRoast, heardText]);

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

    const handleReset = useCallback(() => {
        reset();
        setState('idle');
        setRoast('');
        setHeardText('');
        setTypedAttempt('');
        setPendingRoast(null);
        setShowDisclaimer(false);
    }, [reset]);

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
                    className="flex items-center gap-4 mb-6"
                >
                    <span className="text-3xl sm:text-4xl text-accent font-devanagari tracking-tight">
                        {pronunciation.devanagari}
                    </span>
                    <span className="text-lg sm:text-xl text-mist font-serif tracking-tight">
                        {pronunciation.phonetic}
                    </span>
                    <button
                        onClick={handlePlayAudio}
                        className="p-2 rounded-full border border-border hover:border-accent hover:text-accent text-mist transition-colors"
                        aria-label="Hear pronunciation"
                    >
                        <Volume2 size={16} />
                    </button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-mist text-lg sm:text-xl max-w-xl leading-relaxed mb-6"
                >
                    My biggest ick? People who{' '}
                    <span className="inline-block min-w-[140px]">
                        <FlickerWord words={pronunciation.flickerWords} />
                    </span>{' '}
                    my name. Don&apos;t be a shitbag like them.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-sm text-mist/50 font-sans mb-12"
                >
                    Yeah I use AI to code. You think I wrote this speech recognition logic myself?
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
                            {isSupported && (
                                <button
                                    onClick={handleMicClick}
                                    className="group flex items-center gap-4 px-8 py-4 border-2 border-accent text-ink hover:bg-accent hover:text-sand transition-all duration-300 rounded-full text-lg font-medium"
                                >
                                    <Mic size={24} className="group-hover:scale-110 transition-transform" />
                                    <span>Try saying it</span>
                                </button>
                            )}

                            <button
                                onClick={() => setShowKeyboard(!showKeyboard)}
                                className="group flex items-center gap-3 px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-all duration-300 rounded-full text-sm font-medium"
                            >
                                <Keyboard size={16} />
                                Or type it out
                            </button>

                            <AnimatePresence>
                                {showKeyboard && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="w-full max-w-md overflow-hidden"
                                    >
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={typedAttempt}
                                                onChange={(e) => setTypedAttempt(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleTypedSubmit()}
                                                placeholder="Type how you think it's pronounced..."
                                                className="flex-1 px-4 py-3 bg-surface-elevated border border-border rounded-xl text-ink text-sm placeholder:text-mist/50 focus:outline-none focus:border-accent"
                                            />
                                            <button
                                                onClick={handleTypedSubmit}
                                                className="px-6 py-3 bg-accent text-sand rounded-xl text-sm font-medium hover:bg-accent-light transition-colors"
                                            >
                                                Go
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!isSupported && (
                                <p className="text-sm text-mist">
                                    Speech recognition isn&apos;t available in this browser. Try Chrome or Edge, or type your attempt above.
                                </p>
                            )}

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
                                    onClick={handleReset}
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
                            {heardText && (
                                <p className="text-sm text-mist/60">
                                    You said: <span className="text-ink font-medium">&quot;{heardText}&quot;</span>
                                </p>
                            )}

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
                                    onClick={handleReset}
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
                {showDisclaimer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
                        onClick={handleDeclineDisclaimer}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="bg-surface border-2 border-accent/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                    <Skull size={20} className="text-accent" />
                                </div>
                                <h3 className="text-lg font-serif text-ink">You sure about this?</h3>
                            </div>
                            <p className="text-mist text-sm leading-relaxed mb-2">
                                You said it wrong. Now you get roasted. Pick your poison:
                            </p>
                            <p className="text-mist/60 text-xs leading-relaxed mb-1">
                                <span className="text-accent font-medium">Hit me with it</span> — full gaaliyan, no mercy, not safe for your ego.
                            </p>
                            <p className="text-mist/60 text-xs leading-relaxed mb-6">
                                <span className="text-accent font-medium">Go easy on me</span> — clean insults, still brutal, no swearing.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAcceptDisclaimer}
                                    className="flex-1 px-6 py-3 bg-accent text-sand rounded-xl text-sm font-medium hover:bg-accent-light transition-colors"
                                >
                                    Hit me with it
                                </button>
                                <button
                                    onClick={handleDeclineDisclaimer}
                                    className="px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-xl text-sm"
                                >
                                    Go easy on me
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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