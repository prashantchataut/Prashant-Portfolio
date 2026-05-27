import { siteConfig } from '@/data/config';

export const metadata = {
    title: 'Now — Prashant Chataut',
    description: "What I'm thinking about and working on right now. Pronounced /pruh-SHAANT/.",
};

export default function NowPage() {
    return (
        <div className="min-h-screen pt-40 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-serif text-ink mb-10 tracking-tight">
                    What I&apos;m thinking about.
                </h1>

                <div className="space-y-6 text-lg text-mist leading-relaxed bg-surface border border-border rounded-2xl p-8 sm:p-12">
                    {siteConfig.now?.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}

                    <div className="mt-12 pt-8 border-t border-border flex items-center gap-3">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                        </span>
                        <p className="text-sm font-sans text-mist uppercase tracking-widest text-[11px]">
                            Last updated: March 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}