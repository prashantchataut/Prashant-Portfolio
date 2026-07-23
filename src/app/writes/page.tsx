import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Writes - Prashant Chataut',
    description: 'Short notes on apps and building.',
    alternates: { canonical: 'https://knowprashant.vercel.app/writes' },
};

const posts = [
    {
        slug: 'honestly-blogs-are-boring',
        title: 'Most blogs are boring.',
        date: '2026-05-27',
        excerpt: "I don't write for SEO. These are notes I didn't want to lose.",
    },
    {
        slug: 'software-should-shut-up',
        title: 'Apps should shut up.',
        date: '2026-05-27',
        excerpt: 'Notifications, streaks, badges for opening the app. I build away from that.',
    },
    {
        slug: 'building-nebians',
        title: 'Building NEBians.',
        date: '2026-07-23',
        excerpt: 'Notes and past papers were stuck in chats. So we made a place for them.',
    },
];

export default function WritesPage() {
    return (
        <section className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-serif text-ink tracking-tight mb-4 text-wrap-balance">
                    Writes.
                </h1>
                <p className="text-lg text-mist leading-relaxed mb-16 text-pretty">
                    Short notes. Skip them if you&apos;re busy.
                </p>

                <div className="space-y-12">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/writes/${post.slug}`} className="group block cursor-pointer">
                            <div className="flex items-baseline gap-4 mb-2">
                                <time className="text-xs text-mist/50 font-sans tabular-nums shrink-0">
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </time>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-serif text-ink group-hover:text-accent transition-colors duration-300 mb-3">
                                {post.title}
                            </h2>
                            <p className="text-mist leading-relaxed">{post.excerpt}</p>
                            <div className="mt-3 h-px bg-border" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
