"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { mockWeeklyData } from "@/lib/mock-data";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; payload: { day: string; completed: number; total: number } }>;
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-lg p-3 text-xs">
            <p className="font-600 text-slate-700 mb-1" style={{ fontWeight: 600 }}>{label}</p>
            <p className="text-slate-500">
                Completed:{" "}
                <strong className="text-indigo-600" style={{ fontWeight: 700 }}>
                    {data.completed}/{data.total}
                </strong>
            </p>
            <p className="text-slate-500">
                Rate:{" "}
                <strong className="text-indigo-600" style={{ fontWeight: 700 }}>
                    {data.completed === data.total ? "100" : Math.round((data.completed / data.total) * 100)}%
                </strong>
            </p>
        </div>
    );
}

export function AnalyticsChart() {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm shadow-slate-100 border border-slate-100">
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h4 className="text-sm font-700 text-slate-800 mb-0.5" style={{ fontWeight: 700 }}>
                        Weekly Completion
                    </h4>
                    <p className="text-xs text-slate-400">Habit completion rate per day</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
                        Completed
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-slate-100" />
                        Total
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
                <BarChart
                    data={mockWeeklyData}
                    barCategoryGap="35%"
                    barGap={3}
                >
                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        width={20}
                        tickCount={4}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc", radius: 8 }} />
                    {/* Total bars (background) */}
                    <Bar dataKey="total" fill="#f1f5f9" radius={[6, 6, 6, 6]} />
                    {/* Completed bars (foreground) */}
                    <Bar dataKey="completed" radius={[6, 6, 6, 6]}>
                        {mockWeeklyData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    entry.percentage === 100
                                        ? "#10b981"
                                        : entry.percentage >= 60
                                            ? "#6366f1"
                                            : "#a5b4fc"
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
