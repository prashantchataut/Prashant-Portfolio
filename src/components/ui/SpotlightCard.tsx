'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card with a soft radial ember glow that follows the cursor.
 */
export default function SpotlightCard({
    children,
    className,
    glow = 'var(--accent-glow)',
}: {
    children: ReactNode;
    className?: string;
    glow?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--sx', `${e.clientX - r.left}px`);
        el.style.setProperty('--sy', `${e.clientY - r.top}px`);
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            className={cn(
                'group/spot relative overflow-hidden rounded-3xl border border-border bg-surface',
                className
            )}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/spot:opacity-100"
                style={{
                    background: `radial-gradient(480px circle at var(--sx, 50%) var(--sy, 50%), ${glow}, transparent 65%)`,
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-700 group-hover/spot:opacity-100"
                style={{
                    background:
                        'linear-gradient(90deg, transparent, var(--accent), transparent)',
                }}
            />
            {children}
        </div>
    );
}
