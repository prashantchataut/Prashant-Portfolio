'use client';

export default function NowError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <h2 className="text-2xl font-serif text-ink mb-4">This page had a thought and forgot it.</h2>
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