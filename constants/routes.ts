export const ROUTES = {
    // Public
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",

    // App
    DASHBOARD: "/dashboard",
    HABITS: "/habits",
    PLANNER: "/planner",
    ANALYTICS: "/analytics",
    NOTES: "/notes",
    SETTINGS: "/settings",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
