import { TopNavbar } from "@/components/layout/TopNavbar";
import { MiniCalendar } from "@/components/planner/MiniCalendar";
import { TaskListCard } from "@/components/planner/TaskListCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function PlannerPage() {
    return (
        <>
            <TopNavbar title="Planner" />
            <main className="pt-16 px-6 py-7 max-w-[1400px]">
                <SectionHeader title="Planner" subtitle="Plan your day and week ahead" />
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
                    <MiniCalendar />
                    <TaskListCard />
                </div>
            </main>
        </>
    );
}
