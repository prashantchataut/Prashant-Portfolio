export interface ChangelogEntry {
    version: string;
    title?: string;
    summary?: string;
    date?: string;
    highlights: string[];
}

export interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    status: "active" | "in-progress" | "archived";
    featured: boolean;
    version?: string;
    changelog?: ChangelogEntry[];
    links: {
        github: string | null;
        live: string | null;
        manifesto?: string | null;
    };
    tags: string[];
    image: string;
    accentColor?: string;
    features?: string[];
}

export const projects: Project[] = [
    {
        id: "prody",
        name: "Prody",
        tagline: "For people who want to grow without making it a project.",
        description: "A self-improvement companion that doesn't gamify your anxiety. Journal, learn, schedule messages to your future self, and notice patterns in your thinking over time. No streaks. No guilt. Just you, getting better, at your own pace.",
        status: "active",
        featured: true,
        version: "1.3.0",
        links: {
            github: "https://github.com/prashantchataut/Prody/releases/latest",
            live: null,
            manifesto: "#",
        },
        tags: ["React Native", "AI", "Mental Health", "Mobile"],
        features: [
            "Journal that doesn't judge you for writing three words",
            "AI companion that guides reflection without preaching",
            "Messages to your future self — because sometimes you need to hear from past you",
            "Pattern recognition that shows you what you can't see alone",
            "Anti-Stop Policy: the AI degrades gracefully, it doesn't just die",
        ],
        image: "/assets/changelog/haven_onboarding_showcase.png",
        accentColor: "#D97706",
    },
];