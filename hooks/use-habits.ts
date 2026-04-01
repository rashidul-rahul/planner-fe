"use client";

import { useState, useEffect, useCallback } from "react";
import type { Habit } from "@/types";
import { habitService } from "@/services/habit.service";

interface UseHabitsReturn {
    habits: Habit[];
    isLoading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
    toggleHabit: (id: string) => Promise<void>;
}

export function useHabits(): UseHabitsReturn {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchHabits = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await habitService.getAll();
            setHabits(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch habits"));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const toggleHabit = useCallback(async (id: string) => {
        try {
            await habitService.toggleComplete(id);
            setHabits((prev) =>
                prev.map((h) =>
                    h.id === id ? { ...h, completedToday: !h.completedToday } : h
                )
            );
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to toggle habit"));
        }
    }, []);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    return {
        habits,
        isLoading,
        error,
        refresh: fetchHabits,
        toggleHabit,
    };
}
