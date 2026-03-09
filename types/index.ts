// ─── Habit Types ────────────────────────────────────────────────────────────

export type HabitCategory =
    | "health"
    | "fitness"
    | "mindfulness"
    | "learning"
    | "productivity"
    | "sleep"
    | "hydration"
    | "other";

export type RepeatDay =
    | "mon"
    | "tue"
    | "wed"
    | "thu"
    | "fri"
    | "sat"
    | "sun";

export interface Habit {
    id: string;
    title: string;
    icon: string;
    category: HabitCategory;
    color: string;            // Tailwind bg color class or hex
    streak: number;
    completedToday: boolean;
    weeklyProgress: boolean[]; // length 7, index 0 = Mon
    target: number;           // times per interval
    repeatDays: RepeatDay[];
    reminderTime?: string;    // "HH:MM"
    createdAt: string;
}

// ─── Task Types ──────────────────────────────────────────────────────────────

export type TaskStatus = "pending" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
    id: string;
    title: string;
    time?: string;            // "HH:MM"
    date: string;             // ISO date "YYYY-MM-DD"
    status: TaskStatus;
    priority: TaskPriority;
    color: string;            // accent color
    tags?: string[];
}

// ─── Analytics Types ─────────────────────────────────────────────────────────

export interface WeeklyData {
    day: string;
    completed: number;
    total: number;
    percentage: number;
}

export interface HeatmapCell {
    date: string;
    value: number; // 0-4 intensity
}

// ─── Stats Types ─────────────────────────────────────────────────────────────

export interface StatCardData {
    id: string;
    label: string;
    value: string | number;
    subtext: string;
    icon: string;
    trend?: number;           // percentage change
    color: string;
}

// ─── User Types ──────────────────────────────────────────────────────────────

export interface User {
    name: string;
    firstName: string;
    avatar?: string;
    email: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
    id: string;
    label: string;
    icon: string;
    href: string;
    badge?: number;
}

// ─── Quick Add Form ──────────────────────────────────────────────────────────

export interface QuickAddFormData {
    type: "habit" | "task";
    title: string;
    icon: string;
    category: HabitCategory;
    color: string;
    repeatDays: RepeatDay[];
    reminderTime: string;
    target: number;
}
