"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, getDay } from "date-fns";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function MiniCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selected, setSelected] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Get day of week offset (1=Mon...7=Sun, convert to 0-indexed from Mon)
    const startOffset = (getDay(monthStart) + 6) % 7;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm shadow-slate-100 border border-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-700 text-slate-800" style={{ fontWeight: 700 }}>
                    {format(currentMonth, "MMMM yyyy")}
                </h4>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setCurrentMonth((d) => subMonths(d, 1))}
                        className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 text-slate-400" />
                    </button>
                    <button
                        onClick={() => setCurrentMonth((d) => addMonths(d, 1))}
                        className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS.map((d) => (
                    <div key={d} className="text-center text-[10px] font-600 text-slate-400 py-1" style={{ fontWeight: 600 }}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-0.5">
                {/* Offset empty cells */}
                {Array.from({ length: startOffset }).map((_, i) => (
                    <div key={`offset-${i}`} />
                ))}

                {days.map((day) => {
                    const isSelected = isSameDay(day, selected);
                    const todayDay = isToday(day);

                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => setSelected(day)}
                            className={cn(
                                "aspect-square flex items-center justify-center rounded-xl text-xs transition-all duration-150 font-500 mx-auto w-8",
                                isSelected
                                    ? "bg-indigo-600 text-white font-700 shadow-sm shadow-indigo-200"
                                    : todayDay
                                        ? "bg-indigo-50 text-indigo-700 font-700"
                                        : "text-slate-600 hover:bg-slate-50"
                            )}
                            style={{ fontWeight: isSelected || todayDay ? 700 : 500 }}
                        >
                            {format(day, "d")}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
