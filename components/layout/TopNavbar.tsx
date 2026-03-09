"use client";

import { Bell, Search, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getTodayLabel } from "@/lib/utils";
import { mockUser } from "@/lib/mock-data";

interface TopNavbarProps {
    title: string;
    onQuickAdd?: () => void;
}

export function TopNavbar({ title, onQuickAdd }: TopNavbarProps) {
    return (
        <header className="fixed top-0 left-60 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-20 flex items-center px-6 gap-4">
            {/* Page Title */}
            <div className="flex flex-col min-w-0">
                <h1 className="text-[17px] font-700 text-slate-800 leading-tight truncate" style={{ fontWeight: 700 }}>
                    {title}
                </h1>
                <p className="text-[11px] text-slate-400 hidden sm:block">{getTodayLabel()}</p>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-xs hidden md:block ml-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <Input
                    placeholder="Search habits, tasks…"
                    className="pl-9 h-9 text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-colors"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto md:ml-4">
                {/* Notification */}
                <button className="relative w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <Bell className="w-4 h-4 text-slate-500" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                </button>

                {/* Quick Add */}
                <Button
                    size="sm"
                    onClick={onQuickAdd}
                    className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm gap-1.5 shadow-sm shadow-indigo-200 transition-all"
                    style={{ fontWeight: 600 }}
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Quick Add</span>
                </Button>

                {/* Avatar */}
                <Avatar className="w-9 h-9 ring-2 ring-indigo-100 cursor-pointer">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback className="bg-indigo-600 text-white text-xs font-600" style={{ fontWeight: 600 }}>
                        {mockUser.firstName[0]}S
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}
