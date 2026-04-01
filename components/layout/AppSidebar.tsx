"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems } from "@/constants/navigation";

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col bg-white border-r border-slate-100 z-30 shadow-[1px_0_16px_0_rgba(0,0,0,0.04)]">
            {/* Brand */}
            <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-200">
                    <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <span className="text-[17px] font-700 tracking-tight text-slate-800" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                    Flow<span className="text-indigo-600">Day</span>
                </span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <p className="px-3 mb-2 text-[10px] font-600 uppercase tracking-widest text-slate-400" style={{ fontWeight: 600 }}>
                    Menu
                </p>
                <ul className="space-y-0.5">
                    {mainNavItems.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-500 transition-all duration-150 group",
                                        active
                                            ? "bg-indigo-50 text-indigo-700"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                    )}
                                    style={{ fontWeight: active ? 600 : 500 }}
                                >
                                    <span
                                        className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                            active
                                                ? "bg-indigo-100 text-indigo-600"
                                                : "bg-transparent text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </span>
                                    {item.label}
                                    {active && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom motivational card */}
            <div className="mx-3 mb-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200/50">
                <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-4 h-4 text-orange-300" />
                    <span className="text-xs font-600" style={{ fontWeight: 600 }}>Today&apos;s Streak</span>
                </div>
                <p className="text-2xl font-800 mb-1" style={{ fontWeight: 800 }}>🔥 21 Days</p>
                <p className="text-[11px] text-indigo-200 leading-snug">
                    Keep pushing — consistency builds greatness.
                </p>
            </div>
        </aside>
    );
}
