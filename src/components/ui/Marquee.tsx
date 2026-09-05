import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function Marquee({
    children,
    duration = 32,
    className,
    trackClassName,
}: {
    children: ReactNode;
    duration?: number;
    className?: string;
    trackClassName?: string;
}) {
    return (
        <div className={cn('marquee-paused overflow-hidden', className)}>
            <div
                className={cn('marquee-track flex w-max', trackClassName)}
                style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
            >
                <div className="flex items-center shrink-0">{children}</div>
                <div className="flex items-center shrink-0" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
}
