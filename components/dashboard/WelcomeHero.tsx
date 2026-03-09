"use client";

import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGreeting, getTodayLabel } from "@/lib/utils";
import { mockUser } from "@/lib/mock-data";

interface WelcomeHeroProps {
    onQuickAdd?: () => void;
}

export function WelcomeHero({ onQuickAdd }: WelcomeHeroProps) {
    const greeting = getGreeting();

    return (
        <div className="relative rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-7 overflow-hidden shadow-xl shadow-indigo-200/40">
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-12 -right-2 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute top-4 right-16 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative z-10">
                <p className="text-indigo-200 text-sm font-500 mb-1" style={{ fontWeight: 500 }}>
                    {getTodayLabel()}
                </p>
                <h2 className="text-white text-2xl md:text-3xl font-800 tracking-tight mb-1" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                    {greeting}, {mockUser.firstName}! 👋
                </h2>
                <p className="text-indigo-200 text-sm mb-6 max-w-sm">
                    You&apos;re on a 21-day streak. Small steps every day lead to extraordinary results.
                </p>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={onQuickAdd}
                        className="h-10 px-5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl text-sm gap-2 shadow-md font-600 transition-all"
                        style={{ fontWeight: 600 }}
                    >
                        <Plus className="w-4 h-4" />
                        Add Habit
                    </Button>
                    <Button
                        variant="ghost"
                        className="h-10 px-4 text-white hover:bg-white/10 rounded-xl text-sm gap-1.5 font-500"
                        style={{ fontWeight: 500 }}
                    >
                        View All
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
