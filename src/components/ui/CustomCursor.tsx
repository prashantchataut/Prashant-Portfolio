"use client";
import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

    const cursorSize = isHovered ? 60 : 10;

    useEffect(() => {
        // Only show on devices with a fine pointer
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        setIsDesktop(hasFinePointer);
        if (!hasFinePointer) return;

        const manageMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - cursorSize / 2);
            mouseY.set(e.clientY - cursorSize / 2);
        };

        const manageMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'LABEL'].includes(target.tagName) || target.closest('[data-cursor="hover"]')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', manageMouseMove, { passive: true });
        window.addEventListener('mouseover', manageMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
            window.removeEventListener('mouseover', manageMouseOver);
        };
    }, [cursorSize, mouseX, mouseY]);

    if (!isDesktop) return null;

    return (
        <motion.div
            className="fixed left-0 top-0 z-[9999] pointer-events-none rounded-full bg-accent"
            style={{
                left: smoothX,
                top: smoothY,
                width: cursorSize,
                height: cursorSize,
                mixBlendMode: 'difference',
            }}
            animate={{
                width: cursorSize,
                height: cursorSize,
            }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                mass: 0.1
            }}
        />
    );
}
