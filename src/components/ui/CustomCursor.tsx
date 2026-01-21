"use client";
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorSize = isHovered ? 60 : 20;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, smoothOptions);
    const smoothY = useSpring(mouseY, smoothOptions);

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - cursorSize / 2);
            mouseY.set(e.clientY - cursorSize / 2);
        };

        const manageMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName) || target.closest('[data-hover]')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', manageMouseMove);
        window.addEventListener('mouseover', manageMouseOver); // Delegate for performance? using global here for simplicity

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
            window.removeEventListener('mouseover', manageMouseOver);
        };
    }, [cursorSize, mouseX, mouseY]);

    return (
        <motion.div
            className="fixed left-0 top-0 z-[9999] pointer-events-none rounded-full bg-ink mix-blend-exclusion"
            style={{
                left: smoothX,
                top: smoothY,
                width: cursorSize,
                height: cursorSize,
            }}
            animate={{
                width: cursorSize,
                height: cursorSize,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
        />
    );
}
