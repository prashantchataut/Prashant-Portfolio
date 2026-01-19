"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ParallaxImageProps extends Omit<ImageProps, 'src'> {
    src: string;
    className?: string;
    containerClassName?: string;
}

export default function ParallaxImage({ src, alt, className, containerClassName, ...props }: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.1]); // Slight scale to avoid whitespace

    return (
        <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)}>
            <motion.div style={{ y, scale }} className="w-full h-full">
                <div className={cn("relative w-full h-full", className)}>
                    <Image
                        src={src}
                        alt={alt || "Parallax Image"}
                        fill
                        className="object-cover"
                        {...props}
                    />
                </div>
            </motion.div>
        </div>
    );
}
