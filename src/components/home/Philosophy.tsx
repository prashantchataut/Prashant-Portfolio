'use client';

import { philosophy } from '@/data/content';
import Reveal from '@/components/ui/Reveal';

export default function Philosophy() {
    return (
        <section id="philosophy" className="py-24 sm:py-36 relative">
            <div className="section-divider absolute inset-x-0 top-0" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <Reveal className="mb-14 sm:mb-20">
                    <p className="mono-label text-mist mb-4">03 — Philosophy</p>
                    <h2 className="display text-ink text-wrap-balance" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
                        {philosophy.sectionTitle.replace(/\.$/, '')}
                        <em className="text-accent">.</em>
                    </h2>
                </Reveal>

                <div className="border-t border-border">
                    {philosophy.items.map((item, i) => (
                        <Reveal key={i} delay={0.06 * i}>
                            <div className="group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-10 sm:py-14 border-b border-border transition-colors duration-500 hover:bg-surface/50 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-sm">
                                <span className="sm:col-span-1 mono-label text-mist/50 group-hover:text-accent transition-colors duration-500 pt-2">
                                    0{i + 1}
                                </span>
                                <h3 className="sm:col-span-5 text-2xl sm:text-4xl display text-ink leading-tight transition-transform duration-500 group-hover:translate-x-2">
                                    {item.title}
                                </h3>
                                <p className="sm:col-span-6 text-mist text-base sm:text-lg leading-relaxed">
                                    {item.body}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
