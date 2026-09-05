'use client';

import { type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Subtle 3D perspective tilt that springs back on leave.
 */
export default function TiltCard({
    children,
    className,
    intensity = 6,
}: {
    children: ReactNode;
    className?: string;
    intensity?: number;
}) {
    const reduce = useReducedMotion();
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 180, damping: 22, mass: 0.6 });
    const sry = useSpring(ry, { stiffness: 180, damping: 22, mass: 0.6 });

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * intensity);
        rx.set(-py * intensity);
    };

    const onLeave = () => {
        rx.set(0);
        ry.set(0);
    };

    return (
        <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
