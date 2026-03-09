"use client";

import { Flame, Target, CheckSquare, Zap } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { mockHabits } from "@/lib/mock-data";
import { calcProgress } from "@/lib/utils";

export function StatsOverview() {
    const completed = mockHabits.filter((h) => h.completedToday).length;
    const total = mockHabits.length;
    const percentage = calcProgress(completed, total);

    const maxStreak = Math.max(...mockHabits.map((h) => h.streak));

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Today's Progress */}
            <StatCard
                label="Today's Progress"
                value={`${completed}/${total}`}
                subtext={`${total - completed} habit${total - completed !== 1 ? "s" : ""} remaining`}
                icon={<Target className="w-5 h-5" />}
                accentColor="#6366f1"
                trend={12}
            >
                <div className="flex items-center gap-3 mb-0.5">
                    <ProgressRing
                        percentage={percentage}
                        size={52}
                        strokeWidth={6}
                        color="#6366f1"
                        trackColor="#e0e7ff"
                    >
                        <span className="text-[11px] font-700 text-slate-700" style={{ fontWeight: 700 }}>
                            {percentage}%
                        </span>
                    </ProgressRing>
                    <div>
                        <p className="text-2xl font-800 text-slate-800 leading-none" style={{ fontWeight: 800 }}>
                            {completed}/{total}
                        </p>
                        <p className="text-[10px] font-600 uppercase tracking-widest text-slate-400 mt-1" style={{ fontWeight: 600 }}>
                            Today&apos;s Progress
                        </p>
                    </div>
                </div>
            </StatCard>

            {/* Streak */}
            <StatCard
                label="Best Streak"
                value={`${maxStreak} days`}
                subtext="Workout habit leading"
                icon={<Flame className="w-5 h-5" />}
                accentColor="#f97316"
                trend={5}
            >
                <div className="mb-0.5">
                    <p className="text-2xl font-800 text-slate-800 mb-0.5 tracking-tight" style={{ fontWeight: 800 }}>
                        🔥 {maxStreak} <span className="text-base font-600 text-slate-500">days</span>
                    </p>
                    <p className="text-[10px] font-600 uppercase tracking-widest text-slate-400" style={{ fontWeight: 600 }}>
                        Best Streak
                    </p>
                </div>
            </StatCard>

            {/* Completed Tasks */}
            <StatCard
                label="Tasks Done"
                value="2/5"
                subtext="3 tasks pending today"
                icon={<CheckSquare className="w-5 h-5" />}
                accentColor="#10b981"
                trend={-8}
            >
                <div className="mb-0.5">
                    <p className="text-2xl font-800 text-slate-800 mb-0.5 tracking-tight" style={{ fontWeight: 800 }}>
                        2<span className="text-slate-300">/5</span>
                    </p>
                    <p className="text-[10px] font-600 uppercase tracking-widest text-slate-400" style={{ fontWeight: 600 }}>
                        Tasks Done
                    </p>
                </div>
            </StatCard>

            {/* Focus Score */}
            <StatCard
                label="Focus Score"
                value="84"
                subtext="Weekly consistency avg"
                icon={<Zap className="w-5 h-5" />}
                accentColor="#8b5cf6"
                trend={3}
            >
                <div className="flex items-center gap-3 mb-0.5">
                    <ProgressRing
                        percentage={84}
                        size={52}
                        strokeWidth={6}
                        color="#8b5cf6"
                        trackColor="#ede9fe"
                    >
                        <span className="text-[11px] font-700 text-slate-700" style={{ fontWeight: 700 }}>
                            84
                        </span>
                    </ProgressRing>
                    <div>
                        <p className="text-2xl font-800 text-slate-800 leading-none" style={{ fontWeight: 800 }}>
                            84
                        </p>
                        <p className="text-[10px] font-600 uppercase tracking-widest text-slate-400 mt-1" style={{ fontWeight: 600 }}>
                            Focus Score
                        </p>
                    </div>
                </div>
            </StatCard>
        </div>
    );
}
