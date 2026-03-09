import { TopNavbar } from "@/components/layout/TopNavbar";
import { HabitCard } from "@/components/habits/HabitCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { mockHabits } from "@/lib/mock-data";

export default function HabitsPage() {
    return (
        <>
            <TopNavbar title="Habits" />
            <main className="pt-16 px-6 py-7 max-w-[1400px]">
                <SectionHeader
                    title="All Habits"
                    subtitle={`${mockHabits.length} habits tracked`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {mockHabits.map((habit) => (
                        <HabitCard key={habit.id} habit={habit} />
                    ))}
                </div>
            </main>
        </>
    );
}
