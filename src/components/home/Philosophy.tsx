"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

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
            <div className="sticky top-0 flex h-screen items-center overflow-hidden border-t border-white/10">
                <motion.div style={{ x }} className="flex gap-16 px-16 items-center">

                    {/* Title Card */}
                    <div className="h-[60vh] w-[80vw] md:w-[40vw] shrink-0 flex flex-col justify-center border-r border-ink/5 pr-16 bg-sand z-10">
                        <h2 className="text-[6vw] font-black uppercase leading-none text-ink font-mono">
                            Core<br />
                            <span className="text-accent">Philosophy</span>
                        </h2>
                        <p className="mt-8 text-xl text-mist font-secondary max-w-xl">
                            I believe in systems that are as beautiful as they are functional. Code is not just logic; it's structure, rhythm, and motion.
                        </p>
                    </div>

                    {/* Cards */}
                    {cards.map((card) => (
                        <motion.div
                            key={card.id}
                            onHoverStart={() => setHoveredCard(card.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            className={`h-[60vh] w-[400px] shrink-0 border border-ink/10 bg-white p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer group relative overflow-hidden ${hoveredCard && hoveredCard !== card.id ? 'opacity-30 blur-sm scale-95' : 'opacity-100 scale-100 hover:border-accent hover:shadow-2xl'
                                }`}
                            data-cursor="hover"
                        >
                            <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                            <div className="relative z-10 flex justify-between items-start">
                                <span className="text-4xl font-bold text-accent/50 group-hover:text-accent transition-colors font-mono">{card.num}</span>
                                <ArrowRight className="text-ink -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:rotate-0 transform" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-ink mb-4 uppercase font-mono tracking-tight group-hover:translate-x-2 transition-transform duration-300">{card.title}</h3>
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
