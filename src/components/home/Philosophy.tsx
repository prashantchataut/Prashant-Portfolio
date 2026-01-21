"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Philosophy = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

    return (
        <section ref={targetRef} className="relative h-[200vh] bg-sand">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden border-t border-white/10">
                <motion.div style={{ x }} className="flex gap-16 px-16">

                    {/* Title Card */}
                    <div className="h-[60vh] w-[80vw] md:w-[60vw] shrink-0 flex flex-col justify-center border-r border-white/10 pr-16 bg-sand z-10">
                        <h2 className="text-[8vw] font-black uppercase leading-none text-ink">
                            Core<br />
                            <span className="text-accent">Philosophy</span>
                        </h2>
                        <p className="mt-8 text-xl text-mist font-secondary max-w-xl">
                            I believe in systems that are as beautiful as they are functional. Code is not just logic; it's structure, rhythm, and motion.
                        </p>
                    </div>

                    {/* Card 1: Kinetic */}
                    <div className="h-[60vh] w-[400px] shrink-0 border border-white/10 bg-slate p-8 flex flex-col justify-between hover:border-accent hover:bg-accent/5 transition-colors duration-500">
                        <span className="text-4xl font-bold text-accent">01</span>
                        <div>
                            <h3 className="text-2xl font-bold text-ink mb-4 uppercase">Kinetic Motion</h3>
                            <p className="text-mist">Movement should be purposeful. Every interaction has weight and physical presence.</p>
                        </div>
                    </div>

                    {/* Card 2: Precision */}
                    <div className="h-[60vh] w-[400px] shrink-0 border border-white/10 bg-slate p-8 flex flex-col justify-between hover:border-accent hover:bg-accent/5 transition-colors duration-500">
                        <span className="text-4xl font-bold text-accent">02</span>
                        <div>
                            <h3 className="text-2xl font-bold text-ink mb-4 uppercase">System Precision</h3>
                            <p className="text-mist">Clean code equals clean experiences. Architecture is the hidden design.</p>
                        </div>
                    </div>

                    {/* Card 3: Impact */}
                    <div className="h-[60vh] w-[400px] shrink-0 border border-white/10 bg-slate p-8 flex flex-col justify-between hover:border-accent hover:bg-accent/5 transition-colors duration-500">
                        <span className="text-4xl font-bold text-accent">03</span>
                        <div>
                            <h3 className="text-2xl font-bold text-ink mb-4 uppercase">Human Impact</h3>
                            <p className="text-mist">Technology serves humanity. We build to empower, not just to compute.</p>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default Philosophy;
