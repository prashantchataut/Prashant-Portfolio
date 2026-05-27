import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <h1 className="text-8xl font-serif text-ink mb-6">404</h1>
                <p className="text-xl text-mist mb-2">You found a page that doesn&apos;t exist.</p>
                <p className="text-mist mb-8">Unlike my name, this one&apos;s hard to mispronounce.</p>
                <Link
                    href="/"
                    className="px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full text-sm font-medium"
                >
                    Go home, try saying &ldquo;Prashant&rdquo; instead
                </Link>
            </div>
        </div>
    );
}