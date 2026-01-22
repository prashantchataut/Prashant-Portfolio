"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    // Spring physics for smooth movement
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, smoothOptions);
    const smoothY = useSpring(mouseY, smoothOptions);

    const cursorSize = isHovered ? 80 : 12; // Base size

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX - cursorSize / 2);
            mouseY.set(clientY - cursorSize / 2);
        };

        const manageMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive elements
            if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'LABEL'].includes(target.tagName) || target.closest('[data-cursor="hover"]')) {
                setIsHovered(true);
                setIsPointer(true);
            } else {
                setIsHovered(false);
                setIsPointer(false);
            }
        };

        window.addEventListener('mousemove', manageMouseMove);
        window.addEventListener('mouseover', manageMouseOver);

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
            window.removeEventListener('mouseover', manageMouseOver);
        };
    }, [cursorSize, mouseX, mouseY]);

    return (
        <>
            <motion.div
                className="fixed left-0 top-0 z-[9999] pointer-events-none rounded-full bg-ink mix-blend-difference"
                style={{
                    left: smoothX,
                    top: smoothY,
                    width: cursorSize,
                    height: cursorSize,
                    pointerEvents: 'none',
                }}
                animate={{
                    width: cursorSize,
                    height: cursorSize,
                    scale: isHovered ? 1 : 1,
                }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    mass: 0.1
                }}
            >
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <div className="w-2 h-2 bg-sand rounded-full" />
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
