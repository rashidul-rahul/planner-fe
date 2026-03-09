"use client";

import { mockHeatmapData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const HEATMAP_COLORS = [
    "bg-slate-100",
    "bg-indigo-100",
    "bg-indigo-200",
    "bg-indigo-400",
    "bg-indigo-600",
];

const WEEK_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

export function HeatmapChart() {
    const weeks: typeof mockHeatmapData[] = [];
    for (let i = 0; i < mockHeatmapData.length; i += 7) {
        weeks.push(mockHeatmapData.slice(i, i + 7));
    }

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm shadow-slate-100 border border-slate-100">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h4 className="text-sm font-700 text-slate-800 mb-0.5" style={{ fontWeight: 700 }}>
                        Consistency Heatmap
                    </h4>
                    <p className="text-xs text-slate-400">Last 12 weeks of habit activity</p>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Less</span>
                    {HEATMAP_COLORS.map((c, i) => (
                        <div key={i} className={cn("w-3 h-3 rounded-sm", c)} />
                    ))}
                    <span>More</span>
                </div>
            </div>

            <div className="flex gap-1.5">
                {/* Day labels */}
                <div className="flex flex-col gap-1 pt-0">
                    {WEEK_LABELS.map((label, i) => (
                        <div key={i} className="h-[14px] flex items-center">
                            <span className="text-[9px] text-slate-300 w-6">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Heatmap grid */}
                <div className="flex gap-1 flex-1 overflow-x-auto">
                    {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-1">
                            {week.map((cell, di) => (
                                <div
                                    key={di}
                                    className={cn(
                                        "w-3.5 h-3.5 rounded-sm transition-all duration-150 hover:scale-110 cursor-default",
                                        HEATMAP_COLORS[cell.value]
                                    )}
                                    title={`${cell.date}: ${cell.value} habits`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
