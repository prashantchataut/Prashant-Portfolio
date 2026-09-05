import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
                serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
                devanagari: ['var(--font-devanagari)', 'var(--font-sans)', 'sans-serif'],
            },
            colors: {
                sand: 'rgb(var(--sand-rgb) / <alpha-value>)',
                ash: 'rgb(var(--ash-rgb) / <alpha-value>)',
                ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
                slate: 'var(--slate)',
                mist: 'rgb(var(--mist-rgb) / <alpha-value>)',
                accent: {
                    DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
                    light: 'rgb(var(--accent-light-rgb) / <alpha-value>)',
                    glow: 'var(--accent-glow)',
                },
                surface: {
                    DEFAULT: 'rgb(var(--surface-rgb) / <alpha-value>)',
                    elevated: 'rgb(var(--surface-elevated-rgb) / <alpha-value>)',
                },
                border: 'var(--border)',
            },
            backgroundImage: {
                'gradient-accent': 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
            },
            animation: {
                'fade-up': 'fadeUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                'fade-in': 'fadeIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                'pulse-dot': 'pulseDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'confetti': 'confetti 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                pulseDot: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                confetti: {
                    '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
                    '100%': { transform: 'translateY(-100px) rotate(720deg)', opacity: '0' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
