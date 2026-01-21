"use client";
import { motion } from "framer-motion";

export default function Signature({ className }: { className?: string }) {
    // A stylized, handwritten-looking path for "Prashant"
    // This is a placeholder path that mimics a signature flow
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 3,
                ease: "easeInOut",
                delay: 0.5
            }
        }
    };

    return (
        <div className={className}>
            <svg
                width="300"
                height="150"
                viewBox="0 0 300 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <motion.path
                    d="M20,100 C40,80 30,120 50,110 S 70,80 90,100 S 110,130 130,110 S 150,80 170,100 S 190,130 210,110 S 230,80 250,100 S 270,130 290,110"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-accent"
                />
                {/* Decorative dot/underline */}
                <motion.circle
                    cx="280"
                    cy="120"
                    r="3"
                    fill="currentColor"
                    className="text-ink"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3.5 }}
                />
            </svg>
        </div>
    );
}
