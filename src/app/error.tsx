'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <h2 className="text-3xl font-serif text-ink mb-4">Something went sideways.</h2>
                <p className="text-mist mb-8">Not the kind of broken that makes you interesting. Just broken.</p>
                <button
                    onClick={reset}
                    className="px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full text-sm font-medium"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}