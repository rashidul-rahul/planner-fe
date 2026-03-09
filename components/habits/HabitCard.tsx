"use client";

import { useState } from "react";
import {
    Droplets,
    BookOpen,
    Dumbbell,
    Moon,
    Brain,
    Flame,
    Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Habit } from "@/types";
import { categoryConfig } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
    Droplets,
    BookOpen,
    Dumbbell,
    Moon,
    Brain,
    Flame,
};

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

interface HabitCardProps {
    habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
    const [completed, setCompleted] = useState(habit.completedToday);
    const Icon = iconMap[habit.icon] ?? Brain;
    const catConfig = categoryConfig[habit.category];

    return (
        <div
            className={cn(
                "group relative bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer select-none",
                "hover:shadow-md hover:shadow-slate-100/80 hover:-translate-y-0.5",
                completed
                    ? "border-slate-100 shadow-sm shadow-slate-100"
                    : "border-slate-100 shadow-sm"
            )}
            onClick={() => setCompleted((c) => !c)}
        >
            {/* Completion overlay tint */}
            {completed && (
                <div
                    className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
                    style={{ backgroundColor: habit.color }}
                />
            )}

            <div className="relative z-10">
                {/* Header row */}
                <div className="flex items-start justify-between mb-3">
                    {/* Icon */}
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${habit.color}18` }}
                    >
                        <Icon className="w-5 h-5" style={{ color: habit.color }} />
                    </div>

                    {/* Check button */}
                    <button
                        className={cn(
                            "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                            completed
                                ? "border-transparent"
                                : "border-slate-200 group-hover:border-slate-300"
                        )}
                        style={
                            completed
                                ? { backgroundColor: habit.color }
                                : {}
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            setCompleted((c) => !c);
                        }}
                    >
                        {completed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </button>
                </div>

                {/* Title + Category */}
                <div className="mb-3">
                    <p
                        className={cn(
                            "text-sm font-600 text-slate-800 mb-1 leading-tight",
                            completed && "line-through text-slate-400"
                        )}
                        style={{ fontWeight: 600 }}
                    >
                        {habit.title}
                    </p>
                    <Badge
                        className="text-[10px] px-2 py-0.5 rounded-full border-0 font-600"
                        style={{
                            backgroundColor: `${catConfig.color}15`,
                            color: catConfig.color,
                            fontWeight: 600,
                        }}
                    >
                        {catConfig.label}
                    </Badge>
                </div>

                {/* Weekly Progress Dots */}
                <div className="flex items-center gap-1 mb-3">
                    {habit.weeklyProgress.map((done, i) => (
                        <div key={i} className="flex flex-col items-center gap-0.5">
                            <div
                                className={cn(
                                    "w-5 h-1.5 rounded-full transition-colors",
                                    done
                                        ? "opacity-100"
                                        : "bg-slate-100"
                                )}
                                style={done ? { backgroundColor: habit.color } : {}}
                            />
                            <span className="text-[9px] text-slate-300">{DAYS[i]}</span>
                        </div>
                    ))}
                </div>

                {/* Streak */}
                <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span className="text-xs text-slate-500">
                        <strong className="text-slate-700" style={{ fontWeight: 600 }}>
                            {habit.streak}
                        </strong>{" "}
                        day streak
                    </span>
                </div>
            </div>
        </div>
    );
}
