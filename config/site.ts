export const siteConfig = {
    name: "FlowDay",
    description:
        "A premium personal productivity dashboard for managing habits, daily tasks, and tracking your progress.",
    keywords: ["habit tracker", "planner", "productivity", "dashboard", "FlowDay"],
    url: "https://flowday.app",
    ogImage: "https://flowday.app/og.jpg",
    links: {
        github: "https://github.com/flowday/app",
        twitter: "https://twitter.com/flowday",
    },
    author: {
        name: "FlowDay",
    },
} as const;

export type SiteConfig = typeof siteConfig;
