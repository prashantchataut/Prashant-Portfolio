import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <h1 className="text-8xl font-serif text-ink mb-6">404</h1>
                <p className="text-xl text-mist mb-2">This page doesn&apos;t exist.</p>
                <p className="text-mist mb-8">Wrong link, or it never existed.</p>
                <Link
                    href="/"
                    className="px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full text-sm font-medium cursor-pointer"
                >
                    Home
                </Link>
            </div>
        </div>
    );
}
