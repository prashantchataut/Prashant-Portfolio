import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Writes — Prashant Chataut',
    description: 'Honest, unfiltered thoughts on building, thinking, and paying attention.',
    alternates: { canonical: 'https://knowprashant.vercel.app/writes' },
};

const posts = [
    {
        slug: 'honestly-blogs-are-boring',
        title: 'Honestly, blogs are boring.',
        date: '2026-05-27',
        excerpt: "Most writing on the internet is content. Content is what happens when you have nothing to say but a deadline to say it. This isn't that. Or maybe it is. You found this page, so you tell me.",
    },
    {
        slug: 'the-name-thing',
        title: 'The name thing.',
        date: '2026-05-27',
        excerpt: "I built an entire website feature around people getting my name wrong. Some people think that's petty. Those people have never had their name mangled 400 times by professors, baristas, and HR systems.",
    },
    {
        slug: 'seventeen',
        title: 'Seventeen.',
        date: '2026-05-27',
        excerpt: "Everyone has opinions about what you can't do at 17. Nobody asks what you're actually doing. I'm building things that matter to people. The birth certificate is irrelevant.",
    },
    {
        slug: 'software-should-shut-up',
        title: 'Software should shut up.',
        date: '2026-05-27',
        excerpt: "Every app wants to be your best friend. Notifications, badges, streaks, pop-ups, onboarding modals. I build things that respect the fact that you have a life outside your phone.",
    },
];

export default function WritesPage() {
    return (
        <section className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-2xl mx-auto">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent font-sans mb-4">
                    You found it.
                </p>
                <h1 className="text-4xl sm:text-6xl font-serif text-ink tracking-tight mb-4">
                    Writes.
                </h1>
                <p className="text-lg text-mist leading-relaxed mb-16">
                    Honestly, blogs are boring. Most of them are SEO dressed up as opinions. These are my opinions dressed up as nothing. Read if you want. Don&apos;t if you don&apos;t. That&apos;s the point.
                </p>

                <div className="space-y-12">
                    {posts.map((post) => (
                        <article key={post.slug} className="group">
                            <div className="flex items-baseline gap-4 mb-2">
                                <time className="text-xs text-mist/50 font-sans tabular-nums shrink-0">
                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </time>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-serif text-ink group-hover:text-accent transition-colors duration-300 mb-3">
                                {post.title}
                            </h2>
                            <p className="text-mist leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="mt-3 h-px bg-border" />
                        </article>
                    ))}
                </div>

                <div className="mt-24 pt-8 border-t border-border">
                    <p className="text-sm text-mist/40 font-sans">
                        You got here because you noticed. That&apos;s the whole point of this page. Most people won&apos;t.
                    </p>
                </div>
            </div>
        </section>
    );
}