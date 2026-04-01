import type { Habit, HabitCategory, RepeatDay } from "@/types";
import { mockHabits, categoryConfig } from "@/lib/mock-data";

// Simulated API delay
const DELAY = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CreateHabitInput {
    title: string;
    icon: string;
    category: HabitCategory;
    color: string;
    target: number;
    repeatDays: RepeatDay[];
    reminderTime?: string;
}

export interface UpdateHabitInput extends Partial<CreateHabitInput> {
    completedToday?: boolean;
    streak?: number;
}

class HabitService {
    private habits: Habit[] = [...mockHabits];

    async getAll(): Promise<Habit[]> {
        await delay(DELAY);
        return [...this.habits];
    }

    async getById(id: string): Promise<Habit | null> {
        await delay(DELAY);
        return this.habits.find((h) => h.id === id) ?? null;
    }

    async getByCategory(category: HabitCategory): Promise<Habit[]> {
        await delay(DELAY);
        return this.habits.filter((h) => h.category === category);
    }

    async getTodayHabits(): Promise<Habit[]> {
        await delay(DELAY);
        const today = new Date().toLocaleDateString("en-US", { weekday: "short" }).toLowerCase() as RepeatDay;
        return this.habits.filter((h) => h.repeatDays.includes(today));
    }

    async create(input: CreateHabitInput): Promise<Habit> {
        await delay(DELAY);
        const newHabit: Habit = {
            id: `h${Date.now()}`,
            ...input,
            streak: 0,
            completedToday: false,
            weeklyProgress: Array(7).fill(false),
            createdAt: new Date().toISOString().split("T")[0],
        };
        this.habits.push(newHabit);
        return newHabit;
    }

    async update(id: string, input: UpdateHabitInput): Promise<Habit | null> {
        await delay(DELAY);
        const index = this.habits.findIndex((h) => h.id === id);
        if (index === -1) return null;
        
        this.habits[index] = { ...this.habits[index], ...input };
        return this.habits[index];
    }

    async delete(id: string): Promise<boolean> {
        await delay(DELAY);
        const index = this.habits.findIndex((h) => h.id === id);
        if (index === -1) return false;
        
        this.habits.splice(index, 1);
        return true;
    }

    async toggleComplete(id: string): Promise<Habit | null> {
        await delay(DELAY);
        const habit = this.habits.find((h) => h.id === id);
        if (!habit) return null;
        
        habit.completedToday = !habit.completedToday;
        if (habit.completedToday) {
            habit.streak += 1;
        } else {
            habit.streak = Math.max(0, habit.streak - 1);
        }
        return habit;
    }

    getCategoryConfig() {
        return categoryConfig;
    }
}

export const habitService = new HabitService();
