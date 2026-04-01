import {
    LayoutDashboard,
    CheckSquare,
    CalendarDays,
    BarChart3,
    StickyNote,
    Settings,
    type LucideIcon,
} from "lucide-react";

export interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
    href: string;
    badge?: number;
}

export const mainNavItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "habits", label: "Habits", icon: CheckSquare, href: "/habits" },
    { id: "planner", label: "Planner", icon: CalendarDays, href: "/planner" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
    { id: "notes", label: "Notes", icon: StickyNote, href: "/notes" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export const authNavItems: NavItem[] = [
    { id: "login", label: "Login", icon: LayoutDashboard, href: "/login" },
    { id: "register", label: "Register", icon: LayoutDashboard, href: "/register" },
];
