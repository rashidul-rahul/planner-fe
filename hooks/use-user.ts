"use client";

import { useState, useEffect, useCallback } from "react";
import type { User } from "@/types";
import { userService } from "@/services/user.service";

interface UseUserReturn {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
}

export function useUser(): UseUserReturn {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchUser = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await userService.getCurrentUser();
            setUser(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch user"));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        user,
        isLoading,
        error,
        refresh: fetchUser,
    };
}
