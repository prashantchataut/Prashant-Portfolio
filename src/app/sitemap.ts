import { MetadataRoute } from 'next';

const writeSlugs = [
    'honestly-blogs-are-boring',
    'software-should-shut-up',
    'building-nebians',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const writes = writeSlugs.map((slug) => ({
        url: `https://knowprashant.vercel.app/writes/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
    }));

    return [
        {
            url: 'https://knowprashant.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://knowprashant.vercel.app/now',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://knowprashant.vercel.app/writes',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...writes,
    ];
}
