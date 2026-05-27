import type { Metadata } from 'next';
import { Sora, Libre_Baskerville, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});

const notoDevanagari = Noto_Sans_Devanagari({
    weight: ['400', '700'],
    subsets: ['devanagari'],
    variable: '--font-devanagari',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://knowprashant.vercel.app'),
    title: 'Prashant Chataut — /pruh-SHAANT/',
    description: 'Developer & product builder. 17. Building Prody — AI companions that respect your time. Pronounced /pruh-SHAANT/ (shaant = peaceful).',
    keywords: ['Prashant Chataut', 'Prashant', 'Prody', 'developer Nepal', 'AI companion', 'self-improvement app', 'pruh-SHAANT'],
    authors: [{ name: 'Prashant Chataut' }],
    creator: 'Prashant Chataut',
    icons: { icon: '/icon.png' },
    openGraph: {
        title: 'Prashant Chataut — /pruh-SHAANT/',
        description: 'Developer & product builder. 17. Building Prody. Pronounced /pruh-SHAANT/ (shaant = peaceful, not shunth).',
        url: 'https://knowprashant.vercel.app',
        siteName: 'Prashant Chataut',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
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
                description: 'Developer & product builder. Building Prody.',
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
                jobTitle: 'Developer & Product Builder',
                description: '17-year-old developer from Nepal building Prody, an AI self-improvement companion.',
                knowsAbout: ['React Native', 'AI', 'Mental Health', 'Mobile Development', 'Product Design'],
            },
            {
                '@type': 'SoftwareApplication',
                name: 'Prody',
                applicationCategory: 'LifestyleApplication',
                operatingSystem: 'iOS, Android',
                description: 'A self-improvement companion. Journal, learn, schedule messages to your future self, and see patterns in your thinking over time.',
                url: 'https://github.com/prashantchataut/Prody',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
            },
            {
                '@type': 'SpeakableSpecification',
                cssSelector: ['#pronunciation-section'],
            },
        ],
    };

    return (
        <html lang="en" className={`${sora.variable} ${libreBaskerville.variable} ${notoDevanagari.variable}`}>
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </head>
            <body className="bg-sand text-ink antialiased selection:bg-accent/30 selection:text-ink font-sans">
                <a href="#main-content" className="skip-to-content">Skip to content</a>
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