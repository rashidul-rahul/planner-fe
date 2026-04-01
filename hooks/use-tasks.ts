"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task } from "@/types";
import { taskService } from "@/services/task.service";

interface UseTasksReturn {
    tasks: Task[];
    isLoading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
    toggleTaskStatus: (id: string) => Promise<void>;
}

export function useTasks(): UseTasksReturn {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchTasks = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await taskService.getAll();
            setTasks(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch tasks"));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const toggleTaskStatus = useCallback(async (id: string) => {
        try {
            await taskService.toggleStatus(id);
            setTasks((prev) =>
                prev.map((t) => {
                    if (t.id !== id) return t;
                    const statusOrder = ["pending", "in-progress", "done"] as const;
                    const currentIndex = statusOrder.indexOf(t.status);
                    const nextIndex = (currentIndex + 1) % statusOrder.length;
                    return { ...t, status: statusOrder[nextIndex] };
                })
            );
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to toggle task"));
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return {
        tasks,
        isLoading,
        error,
        refresh: fetchTasks,
        toggleTaskStatus,
    };
}
