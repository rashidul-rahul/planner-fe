"use client";

import { useState } from "react";
import { WelcomeHero } from "@/components/dashboard/WelcomeHero";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { HabitCard } from "@/components/habits/HabitCard";
import { MiniCalendar } from "@/components/planner/MiniCalendar";
import { TaskListCard } from "@/components/planner/TaskListCard";
import { AnalyticsChart } from "@/components/analytics/AnalyticsChart";
import { HeatmapChart } from "@/components/analytics/HeatmapChart";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { QuickAddDialog } from "@/components/shared/QuickAddDialog";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { mockHabits } from "@/lib/mock-data";

export default function DashboardPage() {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <TopNavbar title="Dashboard" onQuickAdd={() => setDialogOpen(true)} />

            <main className="pt-16 min-h-screen">
                <div className="px-6 py-7 max-w-[1400px] space-y-7">
                    {/* Welcome Hero */}
                    <WelcomeHero onQuickAdd={() => setDialogOpen(true)} />

                    {/* Stats Overview */}
                    <section>
                        <SectionHeader
                            title="Overview"
                            subtitle="Your productivity snapshot for today"
                        />
                        <StatsOverview />
                    </section>

                    {/* Today's Habits */}
                    <section>
                        <SectionHeader
                            title="Today's Habits"
                            subtitle={`${mockHabits.filter((h) => h.completedToday).length} of ${mockHabits.length} completed`}
                            action={
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl gap-1 text-xs font-600"
                                    style={{ fontWeight: 600 }}
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Habit
                                </Button>
                            }
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {mockHabits.map((habit) => (
                                <HabitCard key={habit.id} habit={habit} />
                            ))}
                        </div>
                    </section>

                    {/* Planner + Calendar */}
                    <section>
                        <SectionHeader
                            title="Planner"
                            subtitle="Your schedule and upcoming events"
                            action={
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl gap-1 text-xs font-600"
                                    style={{ fontWeight: 600 }}
                                >
                                    View full planner
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            }
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
                            <MiniCalendar />
                            <TaskListCard />
                        </div>
                    </section>

                    {/* Analytics */}
                    <section>
                        <SectionHeader
                            title="Analytics"
                            subtitle="Trends and habit consistency over time"
                            action={
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl gap-1 text-xs font-600"
                                    style={{ fontWeight: 600 }}
                                >
                                    Full report
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            }
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <AnalyticsChart />
                            <HeatmapChart />
                        </div>
                    </section>
                </div>
            </main>

            <QuickAddDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </>
    );
}
