"use client";

interface ProgressRingProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    trackColor?: string;
    children?: React.ReactNode;
}

export function ProgressRing({
    percentage,
    size = 80,
    strokeWidth = 8,
    color = "#6366f1",
    trackColor = "#e0e7ff",
    children,
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const center = size / 2;

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                className="-rotate-90"
                style={{ transform: "rotate(-90deg)" }}
            >
                {/* Track */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                {/* Progress */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
                {children ?? (
                    <span className="text-sm font-700 text-slate-700" style={{ fontWeight: 700 }}>
                        {percentage}%
                    </span>
                )}
            </div>
        </div>
    );
}
