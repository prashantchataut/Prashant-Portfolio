const NOISE_URI =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/**
 * Filmic grain overlay. Fixed, pointer-transparent, above everything.
 */
export default function Noise() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[80] opacity-[0.05]"
            style={{ backgroundImage: `url("${NOISE_URI}")`, backgroundSize: '180px 180px' }}
        />
    );
}
