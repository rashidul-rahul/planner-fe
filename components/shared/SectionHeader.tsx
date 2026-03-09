"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    className?: string;
}

export function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
    return (
        <div className={cn("flex items-start justify-between gap-4 mb-5", className)}>
            <div>
                <h3 className="text-base font-700 text-slate-800" style={{ fontWeight: 700 }}>
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}
