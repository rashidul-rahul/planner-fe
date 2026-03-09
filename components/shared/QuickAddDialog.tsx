"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { RepeatDay } from "@/types";

const EMOJI_ICONS = ["💧", "📚", "🏋️", "🌙", "🧠", "🧘", "🏃", "✅", "🎯", "💡", "🎨", "🍎"];

const COLORS = [
    { name: "Indigo", value: "#6366f1" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Violet", value: "#8b5cf6" },
    { name: "Emerald", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Pink", value: "#ec4899" },
];

const DAYS: { key: RepeatDay; label: string }[] = [
    { key: "mon", label: "Mo" },
    { key: "tue", label: "Tu" },
    { key: "wed", label: "We" },
    { key: "thu", label: "Th" },
    { key: "fri", label: "Fr" },
    { key: "sat", label: "Sa" },
    { key: "sun", label: "Su" },
];

interface QuickAddDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function QuickAddDialog({ open, onOpenChange }: QuickAddDialogProps) {
    const [type, setType] = useState<"habit" | "task">("habit");
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("💧");
    const [category, setCategory] = useState("health");
    const [color, setColor] = useState("#6366f1");
    const [repeatDays, setRepeatDays] = useState<RepeatDay[]>(["mon", "tue", "wed", "thu", "fri"]);
    const [reminderTime, setReminderTime] = useState("08:00");
    const [target, setTarget] = useState("1");

    const toggleDay = (day: RepeatDay) => {
        setRepeatDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleSubmit = () => {
        // In a real app this would save to state/API
        console.log({ type, title, icon, category, color, repeatDays, reminderTime, target });
        onOpenChange(false);
        // Reset
        setTitle("");
        setIcon("💧");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-2xl border-slate-100 shadow-2xl shadow-slate-200/50 p-0 overflow-hidden gap-0">
                {/* Type Toggle */}
                <div className="flex bg-slate-50 border-b border-slate-100">
                    {(["habit", "task"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setType(t)}
                            className={cn(
                                "flex-1 py-3.5 text-sm font-600 capitalize transition-all",
                                type === t
                                    ? "bg-white text-indigo-700 border-b-2 border-indigo-600 -mb-px"
                                    : "text-slate-400 hover:text-slate-600"
                            )}
                            style={{ fontWeight: 600 }}
                        >
                            {t === "habit" ? "✨ New Habit" : "✅ New Task"}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-base font-700 text-slate-800" style={{ fontWeight: 700 }}>
                            {type === "habit" ? "Create a new habit" : "Add a task"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <Label className="text-xs font-600 text-slate-600 mb-1.5 block" style={{ fontWeight: 600 }}>
                                Title
                            </Label>
                            <Input
                                placeholder={type === "habit" ? "e.g. Drink 8 glasses of water" : "e.g. Review pull requests"}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="rounded-xl border-slate-200 bg-slate-50 text-sm focus:bg-white"
                            />
                        </div>

                        {/* Icon picker */}
                        <div>
                            <Label className="text-xs font-600 text-slate-600 mb-1.5 block" style={{ fontWeight: 600 }}>
                                Icon
                            </Label>
                            <div className="flex flex-wrap gap-2">
                                {EMOJI_ICONS.map((e) => (
                                    <button
                                        key={e}
                                        onClick={() => setIcon(e)}
                                        className={cn(
                                            "w-9 h-9 rounded-xl text-lg border-2 transition-all flex items-center justify-center",
                                            icon === e
                                                ? "border-indigo-500 bg-indigo-50 scale-110"
                                                : "border-transparent bg-slate-50 hover:border-slate-200"
                                        )}
                                    >
                                        {e}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color picker */}
                        <div>
                            <Label className="text-xs font-600 text-slate-600 mb-1.5 block" style={{ fontWeight: 600 }}>
                                Color
                            </Label>
                            <div className="flex gap-2 flex-wrap">
                                {COLORS.map((c) => (
                                    <button
                                        key={c.value}
                                        onClick={() => setColor(c.value)}
                                        title={c.name}
                                        className={cn(
                                            "w-7 h-7 rounded-full border-2 transition-all",
                                            color === c.value ? "border-slate-700 scale-110 ring-2 ring-offset-1" : "border-transparent"
                                        )}
                                        style={{
                                            backgroundColor: c.value,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {type === "habit" && (
                            <>
                                {/* Category */}
                                <div>
                                    <Label className="text-xs font-600 text-slate-600 mb-1.5 block" style={{ fontWeight: 600 }}>
                                        Category
                                    </Label>
                                    <Select value={category} onValueChange={(v) => { if (v) setCategory(v); }}>
                                        <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50 text-sm h-10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {["health", "fitness", "mindfulness", "learning", "productivity", "sleep", "hydration", "other"].map(
                                                (c) => (
                                                    <SelectItem key={c} value={c} className="capitalize">
                                                        {c.charAt(0).toUpperCase() + c.slice(1)}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Repeat days */}
                                <div>
                                    <Label className="text-xs font-600 text-slate-600 mb-1.5 block" style={{ fontWeight: 600 }}>
                                        Repeat
                                    </Label>
                                    <div className="flex gap-1.5">
                                        {DAYS.map(({ key, label }) => (
                                            <button
                                                key={key}
                                                onClick={() => toggleDay(key)}
                                                className={cn(
                                                    "flex-1 py-1.5 rounded-lg text-[11px] font-600 transition-all border",
                                                    repeatDays.includes(key)
                                                        ? "bg-indigo-600 text-white border-indigo-600"
                                                        : "bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300"
                                                )}
                                                style={{ fontWeight: 600 }}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Reminder + Target */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label className="text-xs font-600 text-slate-600 mb-1.5 block" style={{ fontWeight: 600 }}>
                                            Reminder
                                        </Label>
                                        <Input
                                            type="time"
                                            value={reminderTime}
                                            onChange={(e) => setReminderTime(e.target.value)}
                                            className="rounded-xl border-slate-200 bg-slate-50 text-sm h-10"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-600 text-slate-600 mb-1.5 block" style={{ fontWeight: 600 }}>
                                            Daily Goal
                                        </Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={target}
                                            onChange={(e) => setTarget(e.target.value)}
                                            className="rounded-xl border-slate-200 bg-slate-50 text-sm h-10"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <DialogFooter className="px-6 pb-6 gap-2 sm:gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 h-10 font-500"
                        style={{ fontWeight: 500 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!title.trim()}
                        className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white h-10 font-600 shadow-sm shadow-indigo-200"
                        style={{ fontWeight: 600 }}
                    >
                        Create {type === "habit" ? "Habit" : "Task"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
