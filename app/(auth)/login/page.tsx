"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Eye,
    EyeOff,
    Zap,
    CheckCircle2,
    BarChart3,
    CalendarCheck2,
    Flame,
    ArrowRight,
    Mail,
    Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: CheckCircle2,
        title: "Smart Habit Tracking",
        desc: "Build lasting routines with streak tracking and daily reminders.",
    },
    {
        icon: BarChart3,
        title: "Detailed Analytics",
        desc: "Visualise your consistency with beautiful charts and heatmaps.",
    },
    {
        icon: CalendarCheck2,
        title: "Daily Planner",
        desc: "Schedule tasks alongside your habits in one unified view.",
    },
];

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validate = () => {
        const errs: typeof errors = {};
        if (!email.trim()) errs.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email.";
        if (!password) errs.password = "Password is required.";
        else if (password.length < 6) errs.password = "Password must be at least 6 characters.";
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setLoading(true);
        // Simulate async sign-in handshake — replace with real API call
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex">
            {/* ── Left branding panel ─────────────────────────────── */}
            <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-10 overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-white/5" />
                <div className="absolute bottom-0 right-0 w-[340px] h-[340px] rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
                <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-2.5 mb-auto">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" fill="white" />
                    </div>
                    <span className="text-xl font-800 text-white tracking-tight" style={{ fontWeight: 800 }}>
                        FlowDay
                    </span>
                </div>

                {/* Hero copy */}
                <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3 py-1.5 mb-6 w-fit">
                        <Flame className="w-3.5 h-3.5 text-orange-300" />
                        <span className="text-xs text-white/90 font-500" style={{ fontWeight: 500 }}>
                            21,000+ productive users and growing
                        </span>
                    </div>

                    <h1
                        className="text-4xl xl:text-5xl font-800 text-white leading-[1.15] mb-4 tracking-tight"
                        style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
                    >
                        Build better habits.{" "}
                        <span className="text-indigo-200">Every single day.</span>
                    </h1>
                    <p className="text-indigo-200 text-base leading-relaxed mb-10">
                        FlowDay helps you design the life you want — one habit, one task, one streak at a time.
                    </p>

                    <ul className="space-y-4">
                        {features.map(({ icon: Icon, title, desc }) => (
                            <li key={title} className="flex items-start gap-4">
                                <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0 mt-0.5">
                                    <Icon className="w-4.5 h-4.5 text-white" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-600 mb-0.5" style={{ fontWeight: 600 }}>
                                        {title}
                                    </p>
                                    <p className="text-indigo-200 text-xs leading-relaxed">{desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Testimonial */}
                <div className="relative z-10 mt-auto pt-8 border-t border-white/15">
                    <p className="text-indigo-100 text-sm italic leading-relaxed mb-3">
                        &ldquo;FlowDay completely changed how I approach my mornings. I&apos;ve kept a 60-day
                        streak and I&apos;ve never felt more focused.&rdquo;
                    </p>
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white text-xs font-700" style={{ fontWeight: 700 }}>
                            SM
                        </div>
                        <div>
                            <p className="text-white text-xs font-600" style={{ fontWeight: 600 }}>
                                Sofia M.
                            </p>
                            <p className="text-indigo-300 text-[11px]">Product Designer, Berlin</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right form panel ────────────────────────────────── */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">
                {/* Mobile logo */}
                <div className="lg:hidden flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" fill="white" />
                    </div>
                    <span className="text-lg font-800 text-slate-800" style={{ fontWeight: 800 }}>
                        FlowDay
                    </span>
                </div>

                <div className="w-full max-w-sm">
                    {/* Header */}
                    <div className="mb-8">
                        <h2
                            className="text-2xl font-800 text-slate-800 mb-1.5 tracking-tight"
                            style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
                        >
                            Welcome back
                        </h2>
                        <p className="text-sm text-slate-500">
                            Sign in to continue your productivity journey.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {/* Email */}
                        <div>
                            <Label
                                htmlFor="email"
                                className="text-xs font-600 text-slate-600 mb-1.5 block"
                                style={{ fontWeight: 600 }}
                            >
                                Email address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                                    }}
                                    className={cn(
                                        "pl-10 h-11 rounded-xl bg-slate-50 border text-sm transition-colors",
                                        errors.email
                                            ? "border-red-300 focus:border-red-400 bg-red-50"
                                            : "border-slate-200 focus:border-indigo-400 focus:bg-white"
                                    )}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <Label
                                    htmlFor="password"
                                    className="text-xs font-600 text-slate-600"
                                    style={{ fontWeight: 600 }}
                                >
                                    Password
                                </Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-indigo-600 hover:text-indigo-700 font-500"
                                    style={{ fontWeight: 500 }}
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                                    }}
                                    className={cn(
                                        "pl-10 pr-10 h-11 rounded-xl bg-slate-50 border text-sm transition-colors",
                                        errors.password
                                            ? "border-red-300 focus:border-red-400 bg-red-50"
                                            : "border-slate-200 focus:border-indigo-400 focus:bg-white"
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2.5">
                            <button
                                type="button"
                                id="remember"
                                onClick={() => setRemember((r) => !r)}
                                className={cn(
                                    "w-4.5 h-4.5 rounded flex items-center justify-center border-2 transition-all shrink-0",
                                    remember
                                        ? "bg-indigo-600 border-indigo-600"
                                        : "border-slate-300 hover:border-indigo-400"
                                )}
                                style={{ width: 18, height: 18, borderRadius: 5 }}
                            >
                                {remember && (
                                    <svg
                                        className="w-2.5 h-2.5 text-white"
                                        viewBox="0 0 12 10"
                                        fill="none"
                                    >
                                        <path
                                            d="M1 5L4.5 8.5L11 1.5"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                            <label
                                htmlFor="remember"
                                className="text-sm text-slate-500 cursor-pointer select-none"
                                onClick={() => setRemember((r) => !r)}
                            >
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-600 text-sm gap-2 shadow-md shadow-indigo-200/60 transition-all mt-2"
                            style={{ fontWeight: 600 }}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 014 12z" />
                                    </svg>
                                    Signing in…
                                </span>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-3 text-xs text-slate-400">or</span>
                        </div>
                    </div>

                    {/* Register link */}
                    <p className="text-center text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-indigo-600 hover:text-indigo-700 font-600 transition-colors"
                            style={{ fontWeight: 600 }}
                        >
                            Create one free →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
