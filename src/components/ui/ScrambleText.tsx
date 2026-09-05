'use client';

import { useEffect, useRef, useState } from 'react';

const GLYPHS = '#/\\<>—+*·—×?!';

/**
 * Decodes `text` from a scramble of glyphs when it enters the viewport.
 * Respects prefers-reduced-motion (renders instantly).
 */
export default function ScrambleText({
    text,
    className,
    delay = 0,
    duration = 900,
}: {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const [output, setOutput] = useState(text);
    const [inView, setInView] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduced(mq.matches);
        const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (reduced || !inView) return;
        let raf = 0;
        let start: number | null = null;

        const tick = (now: number) => {
            if (start === null) start = now + delay;
            const elapsed = now - start;
            if (elapsed < 0) {
                raf = requestAnimationFrame(tick);
                return;
            }
            const p = Math.min(elapsed / duration, 1);
            const revealCount = Math.floor(p * text.length);
            let out = '';
            for (let i = 0; i < text.length; i++) {
                const ch = text[i];
                if (i < revealCount || ch === ' ') out += ch;
                else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            setOutput(out);
            if (p < 1) raf = requestAnimationFrame(tick);
            else setOutput(text);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, reduced, text, delay, duration]);

    return (
        <span ref={ref} className={className}>
            <span aria-hidden="true">{output}</span>
            <span className="sr-only">{text}</span>
        </span>
    );
}
