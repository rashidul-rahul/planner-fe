"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Eye,
    EyeOff,
    Zap,
    User,
    Mail,
    Lock,
    ArrowRight,
    Sparkles,
    Shield,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const perks = [
    {
        icon: Sparkles,
        text: "Free forever — no credit card needed",
    },
    {
        icon: Shield,
        text: "Your data is private and secure",
    },
    {
        icon: TrendingUp,
        text: "Join 21,000+ people building better habits",
    },
];

type FormErrors = {
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
};

function getPasswordStrength(pw: string): { label: string; color: string; width: string } {
    if (pw.length === 0) return { label: "", color: "", width: "0%" };
    if (pw.length < 6) return { label: "Weak", color: "#ef4444", width: "25%" };
    if (pw.length < 8) return { label: "Fair", color: "#f59e0b", width: "50%" };
    if (!/[A-Z]/.test(pw) || !/[0-9]/.test(pw))
        return { label: "Good", color: "#6366f1", width: "75%" };
    return { label: "Strong", color: "#10b981", width: "100%" };
}

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const strength = getPasswordStrength(password);

    const validate = (): FormErrors => {
        const errs: FormErrors = {};
        if (!name.trim()) errs.name = "Full name is required.";
        if (!email.trim()) errs.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email address.";
        if (!password) errs.password = "Password is required.";
        else if (password.length < 6) errs.password = "Password must be at least 6 characters.";
        if (!confirm) errs.confirm = "Please confirm your password.";
        else if (confirm !== password) errs.confirm = "Passwords do not match.";
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        if (!agreed) {
            return;
        }
        setErrors({});
        setLoading(true);
        // Simulate async account creation — replace with real API call
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        router.push("/dashboard");
    };

    const clearError = (field: keyof FormErrors) =>
        setErrors((p) => ({ ...p, [field]: undefined }));

    return (
        <div className="min-h-screen flex">
            {/* ── Left branding panel ─────────────────────────────── */}
            <div className="hidden lg:flex lg:w-[44%] xl:w-[40%] relative flex-col bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-700 p-10 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
                <div className="absolute bottom-20 -left-10 w-56 h-56 rounded-full bg-white/5" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-2.5 mb-auto">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" fill="white" />
                    </div>
                    <span className="text-xl font-800 text-white" style={{ fontWeight: 800 }}>
                        FlowDay
                    </span>
                </div>

                {/* Hero content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <h1
                        className="text-4xl font-800 text-white leading-tight mb-4 tracking-tight"
                        style={{ fontWeight: 800, letterSpacing: "-0.03em" }}
                    >
                        Your best year starts{" "}
                        <span className="text-violet-200">today.</span>
                    </h1>
                    <p className="text-indigo-200 text-sm leading-relaxed mb-10">
                        Create your free account and start building habits that stick — no excuses, no pressure.
                    </p>

                    <ul className="space-y-5">
                        {perks.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm text-indigo-100">{text}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Mini visual — fake streak card */}
                    <div className="mt-12 bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/15">
                        <p className="text-xs text-indigo-200 mb-3 font-500" style={{ fontWeight: 500 }}>
                            This week&apos;s snapshot
                        </p>
                        <div className="flex items-end gap-1.5 h-10">
                            {[60, 80, 40, 100, 70, 90, 55].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 rounded-sm bg-white/30"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-2">
                            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                <span key={i} className="text-[10px] text-indigo-300 flex-1 text-center">
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-auto pt-6 border-t border-white/15">
                    <p className="text-xs text-indigo-300">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-white font-600 hover:underline"
                            style={{ fontWeight: 600 }}
                        >
                            Sign in →
                        </Link>
                    </p>
                </div>
            </div>

            {/* ── Right form panel ────────────────────────────────── */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white overflow-y-auto">
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
                    <div className="mb-7">
                        <h2
                            className="text-2xl font-800 text-slate-800 mb-1.5 tracking-tight"
                            style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
                        >
                            Create your account
                        </h2>
                        <p className="text-sm text-slate-500">
                            Free forever. Set up in under a minute.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {/* Full Name */}
                        <div>
                            <Label
                                htmlFor="name"
                                className="text-xs font-600 text-slate-600 mb-1.5 block"
                                style={{ fontWeight: 600 }}
                            >
                                Full name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Rahul Sharma"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); clearError("name"); }}
                                    className={cn(
                                        "pl-10 h-11 rounded-xl bg-slate-50 border text-sm transition-colors",
                                        errors.name
                                            ? "border-red-300 bg-red-50"
                                            : "border-slate-200 focus:border-indigo-400 focus:bg-white"
                                    )}
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

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
                                    onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                                    className={cn(
                                        "pl-10 h-11 rounded-xl bg-slate-50 border text-sm transition-colors",
                                        errors.email
                                            ? "border-red-300 bg-red-50"
                                            : "border-slate-200 focus:border-indigo-400 focus:bg-white"
                                    )}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <Label
                                htmlFor="password"
                                className="text-xs font-600 text-slate-600 mb-1.5 block"
                                style={{ fontWeight: 600 }}
                            >
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type={showPw ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Min. 6 characters"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                                    className={cn(
                                        "pl-10 pr-10 h-11 rounded-xl bg-slate-50 border text-sm transition-colors",
                                        errors.password
                                            ? "border-red-300 bg-red-50"
                                            : "border-slate-200 focus:border-indigo-400 focus:bg-white"
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {/* Strength bar */}
                            {password.length > 0 && (
                                <div className="mt-2">
                                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-300"
                                            style={{ width: strength.width, backgroundColor: strength.color }}
                                        />
                                    </div>
                                    <p className="text-[11px] mt-1" style={{ color: strength.color }}>
                                        {strength.label}
                                    </p>
                                </div>
                            )}
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Label
                                htmlFor="confirm"
                                className="text-xs font-600 text-slate-600 mb-1.5 block"
                                style={{ fontWeight: 600 }}
                            >
                                Confirm password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="confirm"
                                    type={showConfirm ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Re-enter your password"
                                    value={confirm}
                                    onChange={(e) => { setConfirm(e.target.value); clearError("confirm"); }}
                                    className={cn(
                                        "pl-10 pr-10 h-11 rounded-xl bg-slate-50 border text-sm transition-colors",
                                        errors.confirm
                                            ? "border-red-300 bg-red-50"
                                            : confirm && confirm === password
                                                ? "border-emerald-300 bg-emerald-50 focus:border-emerald-400"
                                                : "border-slate-200 focus:border-indigo-400 focus:bg-white"
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
                            {confirm && confirm === password && !errors.confirm && (
                                <p className="text-xs text-emerald-600 mt-1">✓ Passwords match</p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2.5 pt-1">
                            <button
                                type="button"
                                onClick={() => setAgreed((a) => !a)}
                                className={cn(
                                    "w-4.5 h-4.5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all",
                                    agreed ? "bg-indigo-600 border-indigo-600" : "border-slate-300 hover:border-indigo-400"
                                )}
                                style={{ width: 18, height: 18, borderRadius: 5 }}
                            >
                                {agreed && (
                                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 10" fill="none">
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
                            <p className="text-xs text-slate-500 leading-relaxed">
                                I agree to the{" "}
                                <Link href="#" className="text-indigo-600 hover:underline font-500" style={{ fontWeight: 500 }}>
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="text-indigo-600 hover:underline font-500" style={{ fontWeight: 500 }}>
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading || !agreed}
                            className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-600 text-sm gap-2 shadow-md shadow-indigo-200/60 transition-all mt-1"
                            style={{ fontWeight: 600 }}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4A8 8 0 014 12z" />
                                    </svg>
                                    Creating account…
                                </span>
                            ) : (
                                <>
                                    Create account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Login link */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-indigo-600 hover:text-indigo-700 font-600 transition-colors"
                            style={{ fontWeight: 600 }}
                        >
                            Sign in →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
