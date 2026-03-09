import { TopNavbar } from "@/components/layout/TopNavbar";
import { AnalyticsChart } from "@/components/analytics/AnalyticsChart";
import { HeatmapChart } from "@/components/analytics/HeatmapChart";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default function AnalyticsPage() {
    return (
        <>
            <TopNavbar title="Analytics" />
            <main className="pt-16 px-6 py-7 max-w-[1400px]">
                <SectionHeader title="Analytics" subtitle="Detailed habit performance and consistency trends" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <AnalyticsChart />
                    <HeatmapChart />
                </div>
            </main>
        </>
    );
}
