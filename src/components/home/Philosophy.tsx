"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const Philosophy = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const cards = [
        {
            id: 1,
            title: "Kinetic Motion",
            desc: "Movement should be purposeful. Every interaction has weight and physical presence.",
            num: "01"
        },
        {
            id: 2,
            title: "System Precision",
            desc: "Clean code equals clean experiences. Architecture is the hidden design.",
            num: "02"
        },
        {
            id: 3,
            title: "Human Impact",
            desc: "Technology serves humanity. We build to empower, not just to compute.",
            num: "03"
        }
    ];

    return (
        <section ref={targetRef} className="relative h-[200vh] bg-sand">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden border-t border-border">
                <motion.div style={{ x }} className="flex gap-16 px-16 items-center">

                    {/* Title Card */}
                    <div className="h-[60vh] w-[80vw] md:w-[40vw] shrink-0 flex flex-col justify-center pr-16 z-10">
                        <h2 className="text-[6vw] font-bold leading-none text-ink">
                            Core<br />
                            <span className="text-accent">Philosophy</span>
                        </h2>
                        <p className="mt-8 text-lg text-mist max-w-xl leading-relaxed">
                            I believe in systems that are as beautiful as they are functional. Code is not just logic; it's structure, rhythm, and motion.
                        </p>
                    </div>

                    {/* Cards */}
                    {cards.map((card) => (
                        <motion.div
                            key={card.id}
                            onHoverStart={() => setHoveredCard(card.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            className={`h-[60vh] w-[400px] shrink-0 border border-border bg-surface p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer group relative overflow-hidden rounded-2xl ${hoveredCard && hoveredCard !== card.id ? 'opacity-30 blur-sm scale-95' : 'opacity-100 scale-100 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5'
                                }`}
                        >
                            <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl" />

                            <div className="relative z-10 flex justify-between items-start">
                                <span className="text-4xl font-bold text-accent/30 group-hover:text-accent transition-colors font-mono">{card.num}</span>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-ink mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-300">{card.title}</h3>
                                <p className="text-mist group-hover:text-ink transition-colors">{card.desc}</p>
                            </div>
                        </motion.div>
                    ))}

                </motion.div>
            </div>
        </section>
    );
};

export default Philosophy;
