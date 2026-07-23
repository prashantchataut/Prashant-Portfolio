'use client';

import { motion } from 'framer-motion';
import { philosophy } from '@/data/content';

export default function Philosophy() {
    return (
        <section id="philosophy" className="py-24 sm:py-32 relative">
            <div className="section-divider" />

            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl sm:text-6xl font-serif text-ink tracking-tight text-wrap-balance">
                        {philosophy.sectionTitle}
                    </h2>
                </motion.div>

                <div className="space-y-16 sm:space-y-24">
                    {philosophy.items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8"
                        >
                            <h3 className="sm:col-span-5 text-2xl sm:text-3xl font-serif text-ink tracking-tight leading-tight">
                                {item.title}
                            </h3>
                            <p className="sm:col-span-7 text-mist text-lg leading-relaxed">
                                {item.body}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}