import type { Metadata } from 'next';
import '@fontsource-variable/sora';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/noto-sans-devanagari';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';
import Noise from '@/components/ui/Noise';

export const metadata: Metadata = {
    metadataBase: new URL('https://knowprashant.vercel.app'),
    title: 'Prashant Chataut',
    description:
        'Prashant Chataut builds NEBians, Retra, and Prody from Nepal. Study apps, a GBA emulator, and quiet journaling.',
    keywords: [
        'Prashant Chataut',
        'NEBians',
        'Retra',
        'Prody',
        'developer Nepal',
        'study platform',
    ],
    authors: [{ name: 'Prashant Chataut' }],
    creator: 'Prashant Chataut',
    icons: { icon: '/icon.png' },
    openGraph: {
        title: 'Prashant Chataut',
        description: 'Builds NEBians, Retra, and Prody. Apps for school, GBA games, and journaling.',
        url: 'https://knowprashant.vercel.app',
        siteName: 'Prashant Chataut',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
    },
    alternates: {
        canonical: 'https://knowprashant.vercel.app',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': 'https://knowprashant.vercel.app/#website',
                url: 'https://knowprashant.vercel.app',
                name: 'Prashant Chataut',
                description:
                    'Prashant Chataut builds NEBians, Retra, and Prody from Nepal.',
            },
            {
                '@type': 'Person',
                '@id': 'https://knowprashant.vercel.app/#person',
                name: 'Prashant Chataut',
                url: 'https://knowprashant.vercel.app',
                sameAs: [
                    'https://github.com/prashantchataut',
                    'https://instagram.com/prashantchataut_',
                ],
                jobTitle: 'Developer',
                description: 'Builds NEBians, Retra, and Prody from Nepal.',
                knowsAbout: [
                    'Mobile Development',
                    'Product Design',
                    'Education Technology',
                    'Android',
                    'React Native',
                ],
            },
            {
                '@type': 'SoftwareApplication',
                name: 'NEBians',
                applicationCategory: 'EducationalApplication',
                operatingSystem: 'Android, Web',
                description:
                    'Study notes, past papers, and forums for students, teachers, and institutes.',
                url: 'https://nebians.consica.com.np/',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
            },
        ],
    };

    return (
        <html lang="en" data-theme="dark">
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </head>
            <body className="bg-sand text-ink antialiased selection:bg-accent/30 selection:text-ink font-sans">
                <a href="#main-content" className="skip-to-content">Skip to content</a>
                <Noise />
                <div
                    aria-hidden="true"
                    className="fixed inset-0 z-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 38% at 50% -12%, var(--accent-glow), transparent 62%)',
                    }}
                />
                <ThemeProvider>
                    <Header />
                    <main id="main-content" className="relative z-10 min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
