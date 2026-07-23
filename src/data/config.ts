import { site, hero, philosophy, about, nebians, retra, prody } from './content';

export const siteConfig = {
    status: hero.tagline,
    availableForFreelance: true,
    links: site.links,
    now: [
        "NEBians is live on web and Play Store. Fixing Neby so it sounds less like a bot, shipping forum and download improvements, listening to what students ask for.",
        "Retra is in progress on GitHub. Controller mapping, save checkpoints, and performance stats are the pieces I'm grinding on.",
        "Prody still gets updates when I have time. Quiet journaling, no streak nonsense.",
        "Reading about how people form habits for real, not how apps invent them.",
    ],
};

export { hero, philosophy, about, nebians, retra, prody, site };
