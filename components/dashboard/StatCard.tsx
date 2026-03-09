"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string | number;
    subtext: string;
    icon: React.ReactNode;
    trend?: number;
    accentColor?: string;
    children?: React.ReactNode;
}

export function StatCard({
    label,
    value,
    subtext,
    icon,
    trend,
    accentColor = "#6366f1",
    children,
}: StatCardProps) {
    const trendUp = trend !== undefined && trend >= 0;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm shadow-slate-100 border border-slate-100 hover:shadow-md hover:shadow-slate-100/80 transition-all duration-200 group">
            <div className="flex items-start justify-between mb-4">
                {/* Icon */}
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}15` }}
                >
                    <span style={{ color: accentColor }}>{icon}</span>
                </div>

                {/* Trend */}
                {trend !== undefined && (
                    <div
                        className={cn(
                            "flex items-center gap-1 text-xs font-600 px-2 py-1 rounded-lg",
                            trendUp
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-500"
                        )}
                        style={{ fontWeight: 600 }}
                    >
                        {trendUp ? (
                            <TrendingUp className="w-3 h-3" />
                        ) : (
                            <TrendingDown className="w-3 h-3" />
                        )}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>

            {/* Value */}
            <div className="mb-3">
                {children ? (
                    children
                ) : (
                    <p className="text-2xl font-800 text-slate-800 mb-0.5 tracking-tight" style={{ fontWeight: 800 }}>
                        {value}
                    </p>
                )}
                <p className="text-[11px] font-600 uppercase tracking-widest text-slate-400" style={{ fontWeight: 600 }}>
                    {label}
                </p>
            </div>

            <p className="text-xs text-slate-500">{subtext}</p>
        </div>
    );
}
