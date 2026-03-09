"use client";

import { useState } from "react";
import { Check, Clock, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types";
import { mockTasks } from "@/lib/mock-data";

const statusConfig: Record<TaskStatus, { label: string; icon: React.ElementType; color: string }> = {
    done: { label: "Done", icon: Check, color: "#10b981" },
    "in-progress": { label: "In Progress", icon: Clock, color: "#f59e0b" },
    pending: { label: "Pending", icon: Circle, color: "#94a3b8" },
};

interface TaskListCardProps {
    tasks?: Task[];
}

export function TaskListCard({ tasks = mockTasks }: TaskListCardProps) {
    const [taskList, setTaskList] = useState(tasks);

    const toggleTask = (id: string) => {
        setTaskList((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, status: t.status === "done" ? "pending" : "done" as TaskStatus }
                    : t
            )
        );
    };

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm shadow-slate-100 border border-slate-100 h-full">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-700 text-slate-800" style={{ fontWeight: 700 }}>
                    Today&apos;s Schedule
                </h4>
                <span className="text-xs text-slate-400">
                    {taskList.filter((t) => t.status === "done").length}/{taskList.length} done
                </span>
            </div>

            <div className="space-y-2">
                {taskList.map((task) => {
                    const done = task.status === "done";
                    const statusConf = statusConfig[task.status];
                    const StatusIcon = statusConf.icon;

                    return (
                        <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={cn(
                                "group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-150",
                                "hover:bg-slate-50 border border-transparent hover:border-slate-100"
                            )}
                        >
                            {/* Color bar */}
                            <div
                                className="w-1 h-8 rounded-full shrink-0"
                                style={{ backgroundColor: task.color }}
                            />

                            {/* Time */}
                            {task.time && (
                                <span className="text-[10px] text-slate-400 w-10 shrink-0 tabular-nums">
                                    {task.time}
                                </span>
                            )}

                            {/* Title */}
                            <p
                                className={cn(
                                    "flex-1 text-sm font-500 text-slate-700 leading-snug",
                                    done && "line-through text-slate-400"
                                )}
                                style={{ fontWeight: 500 }}
                            >
                                {task.title}
                            </p>

                            {/* Status icon */}
                            <div
                                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${statusConf.color}18` }}
                            >
                                <StatusIcon
                                    className="w-3 h-3"
                                    style={{ color: statusConf.color }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
