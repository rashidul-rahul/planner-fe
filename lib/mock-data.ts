import type { Habit, Task, WeeklyData, User } from "@/types";

/**
 * Deterministic seeded PRNG (mulberry32).
 * Returns a value in [0, 1) based on a numeric seed.
 * Identical on server and client — no hydration mismatch.
 */
function seededRandom(seed: number): number {
    let t = seed + 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** Convert a date string "YYYY-MM-DD" to a stable numeric seed */
function dateSeed(dateStr: string): number {
    return dateStr.split("-").reduce((acc, part) => acc * 1000 + parseInt(part, 10), 0);
}

// ─── Mock User ────────────────────────────────────────────────────────────────

export const mockUser: User = {
    name: "Rahul Sharma",
    firstName: "Rahul",
    email: "rahul@example.com",
};

// ─── Mock Habits ─────────────────────────────────────────────────────────────

export const mockHabits: Habit[] = [
    {
        id: "h1",
        title: "Drink Water",
        icon: "Droplets",
        category: "hydration",
        color: "#3b82f6",
        streak: 14,
        completedToday: true,
        weeklyProgress: [true, true, false, true, true, true, false],
        target: 8,
        repeatDays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        reminderTime: "09:00",
        createdAt: "2024-01-01",
    },
    {
        id: "h2",
        title: "Read 20 Minutes",
        icon: "BookOpen",
        category: "learning",
        color: "#8b5cf6",
        streak: 7,
        completedToday: true,
        weeklyProgress: [true, false, true, true, false, true, true],
        target: 1,
        repeatDays: ["mon", "tue", "wed", "thu", "fri"],
        reminderTime: "20:00",
        createdAt: "2024-01-05",
    },
    {
        id: "h3",
        title: "Workout",
        icon: "Dumbbell",
        category: "fitness",
        color: "#ef4444",
        streak: 21,
        completedToday: false,
        weeklyProgress: [true, true, true, false, true, true, false],
        target: 1,
        repeatDays: ["mon", "tue", "wed", "fri", "sat"],
        reminderTime: "07:00",
        createdAt: "2024-01-01",
    },
    {
        id: "h4",
        title: "Sleep Before 11 PM",
        icon: "Moon",
        category: "sleep",
        color: "#6366f1",
        streak: 5,
        completedToday: false,
        weeklyProgress: [true, true, false, true, false, true, true],
        target: 1,
        repeatDays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        reminderTime: "22:30",
        createdAt: "2024-01-10",
    },
    {
        id: "h5",
        title: "Deep Work Session",
        icon: "Brain",
        category: "productivity",
        color: "#f59e0b",
        streak: 12,
        completedToday: true,
        weeklyProgress: [true, true, true, true, false, false, false],
        target: 1,
        repeatDays: ["mon", "tue", "wed", "thu", "fri"],
        reminderTime: "10:00",
        createdAt: "2024-01-03",
    },
];

// ─── Mock Tasks ───────────────────────────────────────────────────────────────

export const mockTasks: Task[] = [
    {
        id: "t1",
        title: "Design system review",
        time: "09:00",
        date: new Date().toISOString().split("T")[0],
        status: "done",
        priority: "high",
        color: "#6366f1",
        tags: ["design", "review"],
    },
    {
        id: "t2",
        title: "Team standup call",
        time: "10:30",
        date: new Date().toISOString().split("T")[0],
        status: "done",
        priority: "medium",
        color: "#3b82f6",
        tags: ["meeting"],
    },
    {
        id: "t3",
        title: "Write blog post draft",
        time: "14:00",
        date: new Date().toISOString().split("T")[0],
        status: "in-progress",
        priority: "medium",
        color: "#8b5cf6",
        tags: ["writing"],
    },
    {
        id: "t4",
        title: "Review pull requests",
        time: "16:00",
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        priority: "high",
        color: "#ef4444",
        tags: ["code"],
    },
    {
        id: "t5",
        title: "Plan sprint for next week",
        time: "17:30",
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        priority: "low",
        color: "#10b981",
        tags: ["planning"],
    },
];

// ─── Mock Weekly Analytics ────────────────────────────────────────────────────

export const mockWeeklyData: WeeklyData[] = [
    { day: "Mon", completed: 4, total: 5, percentage: 80 },
    { day: "Tue", completed: 3, total: 5, percentage: 60 },
    { day: "Wed", completed: 5, total: 5, percentage: 100 },
    { day: "Thu", completed: 2, total: 5, percentage: 40 },
    { day: "Fri", completed: 4, total: 5, percentage: 80 },
    { day: "Sat", completed: 3, total: 5, percentage: 60 },
    { day: "Sun", completed: 1, total: 5, percentage: 20 },
];

// ─── Mock Heatmap Data ────────────────────────────────────────────────────────
// Use a fixed anchor date (today at build/seed time) represented as a stable
// offset calculation so the data is identical on server and client.
// We pick a fixed reference date and build relative offsets from it.
const HEATMAP_ANCHOR = "2026-03-09"; // fixed — update periodically if needed

export const mockHeatmapData = Array.from({ length: 84 }, (_, i) => {
    const anchor = new Date(HEATMAP_ANCHOR);
    anchor.setDate(anchor.getDate() - (83 - i));
    const dateStr = anchor.toISOString().split("T")[0];
    return {
        date: dateStr,
        // seededRandom guarantees same value server+client for same date
        value: Math.floor(seededRandom(dateSeed(dateStr)) * 5),
    };
});

// ─── Category Config ──────────────────────────────────────────────────────────

export const categoryConfig = {
    health: { label: "Health", color: "#10b981" },
    fitness: { label: "Fitness", color: "#ef4444" },
    mindfulness: { label: "Mindfulness", color: "#a78bfa" },
    learning: { label: "Learning", color: "#8b5cf6" },
    productivity: { label: "Productivity", color: "#f59e0b" },
    sleep: { label: "Sleep", color: "#6366f1" },
    hydration: { label: "Hydration", color: "#3b82f6" },
    other: { label: "Other", color: "#6b7280" },
} as const;
