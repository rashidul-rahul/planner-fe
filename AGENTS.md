# FlowDay — AI Coding Agent Guide

> **Project**: FlowDay — Personal Planner & Habit Tracker  
> **Type**: Next.js 16 Web Application  
> **Language**: English (US)  
> **Last Updated**: 2026-04-02

---

## 📑 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Architecture Patterns](#architecture-patterns)
6. [Data Flow](#data-flow)
7. [Component Hierarchy](#component-hierarchy)
8. [Key Type Definitions](#key-type-definitions)
9. [Quick Reference](#quick-reference)
10. [Code Style Guidelines](#code-style-guidelines)
11. [Common Patterns](#common-patterns)
12. [Common Issues & Solutions](#common-issues--solutions)
13. [Development Commands](#development-commands)
14. [Adding New Features](#adding-new-features)
15. [Deployment](#deployment)

---

## 🚀 Quick Start

New to this project? Here's how to get oriented in 60 seconds:

```bash
# 1. Install dependencies
pnpm install

# 2. Start dev server
pnpm dev

# 3. Open http://localhost:3000
```

**Key files to understand first:**
1. `types/index.ts` — All TypeScript types
2. `lib/mock-data.ts` — Sample data (no backend yet)
3. `services/*.service.ts` — Data operations
4. `app/(app)/dashboard/page.tsx` — Main dashboard

**Important:** This is a **mock-data-only** app. No real backend exists yet. All data is in-memory with simulated network delays.

---

## 📋 Project Overview

FlowDay is a premium personal productivity dashboard for managing habits, daily tasks, and tracking progress.

### Key Features
- **Habit Tracking**: Streak counting, weekly progress, categories
- **Task Management**: Priorities (low/medium/high), status tracking (pending/in-progress/done)
- **Daily Planner**: Mini calendar + task list
- **Analytics**: Charts (Recharts) + heatmaps
- **Notes**: Quick notes storage
- **Auth**: Login/register pages (client-side mock only)

### Current State
| Feature | Status | Notes |
|---------|--------|-------|
| Dashboard | ✅ Working | Uses mock data |
| Habits | ✅ Working | Toggle works, but doesn't persist |
| Tasks | ✅ Working | Status toggle cycles done ↔ pending only |
| Planner | ✅ Working | Calendar + task list |
| Analytics | ✅ Working | Static mock data |
| Notes | ⚠️ Placeholder | Empty state only |
| Settings | ⚠️ Placeholder | Empty state only |
| Auth | ✅ Working | Client-side only, no real validation |

---

## 🛠 Technology Stack

| Category | Technology | Version | Notes |
|----------|------------|---------|-------|
| Framework | Next.js (App Router) | 16.1.6 | App Router only |
| Language | TypeScript | 5.x | Strict mode enabled |
| UI | React | 19.2.3 | Latest features |
| Styling | Tailwind CSS | 4.x | CSS-based config (no `tailwind.config.js`) |
| Components | shadcn/ui + Base UI | 4.x / 1.2.0 | See `components.json` |
| Icons | Lucide React | 0.577.0 | All icons from here |
| Charts | Recharts | 3.8.0 | For analytics |
| Dates | date-fns | 4.1.0 | All date operations |
| Package Manager | pnpm | - | Required |

### Tailwind v4 Note
This project uses Tailwind CSS v4 which has a **different configuration approach**:
- Config is in `app/globals.css` using `@theme inline`
- No `tailwind.config.js` file
- Uses CSS variables defined in `:root`

---

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (app)/                    # Route group: Main app WITH sidebar
│   │   ├── dashboard/page.tsx    # Dashboard home (main view)
│   │   ├── habits/page.tsx       # All habits list
│   │   ├── planner/page.tsx      # Calendar + tasks
│   │   ├── analytics/page.tsx    # Charts + heatmap
│   │   ├── notes/page.tsx        # ⚠️ Placeholder
│   │   ├── settings/page.tsx     # ⚠️ Placeholder
│   │   └── layout.tsx            # App layout (Sidebar + content area)
│   │
│   ├── (auth)/                   # Route group: Auth pages NO sidebar
│   │   ├── login/page.tsx        # Login form
│   │   ├── register/page.tsx     # Registration form
│   │   └── layout.tsx            # Auth layout (centered)
│   │
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Home → redirects to /login
│   └── globals.css               # Global styles, Tailwind v4 theme, CSS variables
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui base components (DON'T MODIFY)
│   │   ├── button.tsx            # Button with variants
│   │   ├── card.tsx              # Card container
│   │   ├── dialog.tsx            # Modal/dialog
│   │   ├── input.tsx             # Text input
│   │   ├── label.tsx             # Form labels
│   │   ├── select.tsx            # Dropdown select
│   │   └── ...                   # Other shadcn components
│   │
│   ├── layout/                   # Layout components
│   │   ├── AppSidebar.tsx        # Left navigation (fixed)
│   │   └── TopNavbar.tsx         # Top bar (fixed, with search, notifications)
│   │
│   ├── dashboard/                # Dashboard-specific
│   │   ├── WelcomeHero.tsx       # Greeting + quick actions
│   │   ├── StatsOverview.tsx     # 4 stat cards grid
│   │   └── StatCard.tsx          # Individual stat card
│   │
│   ├── habits/                   # Habit components
│   │   └── HabitCard.tsx         # Single habit display
│   │
│   ├── planner/                  # Planner components
│   │   ├── MiniCalendar.tsx      # Small month calendar
│   │   └── TaskListCard.tsx      # Task list for selected day
│   │
│   ├── analytics/                # Analytics components
│   │   ├── AnalyticsChart.tsx    # Bar chart (weekly completion)
│   │   └── HeatmapChart.tsx      # GitHub-style activity heatmap
│   │
│   └── shared/                   # Shared/reusable components
│       ├── ProgressRing.tsx      # Circular progress indicator
│       ├── QuickAddDialog.tsx    # Modal for adding habits/tasks
│       └── SectionHeader.tsx     # Section title + subtitle + action
│
├── config/                       # Configuration
│   └── site.ts                   # Site metadata, SEO, branding
│
├── constants/                    # App constants
│   ├── navigation.ts             # Sidebar nav items (source of truth)
│   ├── routes.ts                 # Route path constants
│   ├── messages.ts               # Error/success message strings
│   └── index.ts                  # Barrel exports
│
├── hooks/                        # Custom React hooks
│   ├── use-habits.ts             # ⚠️ Defined but NOT USED in components
│   ├── use-tasks.ts              # ⚠️ Defined but NOT USED in components
│   ├── use-user.ts               # ⚠️ Defined but NOT USED in components
│   └── index.ts                  # Barrel exports
│
├── services/                     # Business logic & API layer
│   ├── habit.service.ts          # Habit CRUD + toggleComplete
│   ├── task.service.ts           # Task CRUD + toggleStatus
│   ├── user.service.ts           # User operations
│   └── index.ts                  # Barrel exports
│
├── lib/                          # Utility functions
│   ├── utils.ts                  # cn(), getGreeting(), formatDate(), etc.
│   └── mock-data.ts              # ALL mock data (habits, tasks, user, analytics)
│
├── types/                        # TypeScript definitions
│   └── index.ts                  # All types (Habit, Task, User, etc.)
│
├── public/                       # Static assets (images, fonts)
├── package.json                  # Dependencies
├── next.config.ts                # Next.js config (minimal)
├── tsconfig.json                 # TypeScript config
├── eslint.config.mjs             # ESLint config
├── postcss.config.mjs            # PostCSS (Tailwind v4)
├── components.json               # shadcn/ui config
└── plan.md                       # Current fix plan
```

---

## 🏗 Architecture Patterns

### 1. Service Layer Pattern

**Location:** `services/*.service.ts`

All data operations go through service classes:

```typescript
// services/habit.service.ts
class HabitService {
    private habits: Habit[] = [...mockHabits]; // In-memory store
    
    async getAll(): Promise<Habit[]> {
        await delay(300); // Simulated network
        return [...this.habits];
    }
    
    async toggleComplete(id: string): Promise<Habit | null> {
        // Toggle completedToday + update streak
    }
}

export const habitService = new HabitService();
```

**Why:** Easy to swap mock → real API later.

### 2. Custom Hooks Pattern

**Location:** `hooks/*.ts`

Data fetching with loading/error states:

```typescript
// hooks/use-habits.ts
export function useHabits() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    // Fetch on mount
    useEffect(() => { fetchHabits(); }, []);
    
    return { habits, isLoading, error, refresh, toggleHabit };
}
```

**⚠️ ISSUE:** Hooks exist but components use mock data directly! See `plan.md` for fix.

### 3. Barrel Exports Pattern

Every folder has an `index.ts` for clean imports:

```typescript
// hooks/index.ts
export * from "./use-habits";
export * from "./use-tasks";
export * from "./use-user";

// Usage in component
import { useHabits, useTasks } from "@/hooks";
```

### 4. Constants Pattern

Centralized config in `constants/`:

```typescript
// constants/navigation.ts
export const mainNavItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    // ...
];

// constants/routes.ts
export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    // ...
} as const;
```

---

## 🌊 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     COMPONENT LAYER                          │
│  (DashboardPage, HabitsPage, HabitCard, TaskListCard...)    │
└───────────────────────┬─────────────────────────────────────┘
                        │ import
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                      HOOKS LAYER                             │
│         (useHabits, useTasks, useUser)                      │
│  ⚠️  EXISTS BUT NOT CURRENTLY USED IN COMPONENTS            │
└───────────────────────┬─────────────────────────────────────┘
                        │ calls
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVICES LAYER                            │
│    (habitService, taskService, userService)                 │
└───────────────────────┬─────────────────────────────────────┘
                        │ reads/writes
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│     (mock-data.ts - in-memory, no persistence)              │
└─────────────────────────────────────────────────────────────┘
```

**Current Issue:** Components skip hooks and import mock data directly:

```typescript
// ❌ Current (in components)
import { mockHabits } from "@/lib/mock-data";

// ✅ Should be
import { useHabits } from "@/hooks";
const { habits, isLoading } = useHabits();
```

---

## 🧩 Component Hierarchy

### Dashboard Page Structure
```
DashboardPage
├── TopNavbar
│   └── Avatar (hardcoded initials "RS")
├── WelcomeHero (hardcoded "21-day streak")
├── StatsOverview
│   ├── StatCard (Today's Progress)
│   ├── StatCard (Best Streak) ← hardcoded
│   ├── StatCard (Tasks Done) ← hardcoded 2/5
│   └── StatCard (Focus Score) ← hardcoded 84
├── Today's Habits Section
│   └── HabitCard[] ← uses local state, doesn't call service
├── Planner Section
│   ├── MiniCalendar
│   └── TaskListCard ← uses local state, doesn't call service
└── Analytics Section
    ├── AnalyticsChart ← mock data
    └── HeatmapChart ← mock data
```

### Layout Structure
```
RootLayout
└── AppLayout (for /dashboard, /habits, etc.)
    ├── AppSidebar (fixed left)
    │   └── Nav items from constants/navigation.ts
    └── div.content (margin-left: 240px)
        ├── TopNavbar (fixed top)
        └── main (padding-top: 64px)
```

---

## 🎨 Design System

### Color Palette

| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Primary | `#6366f1` | `indigo-600` | Buttons, links, active states |
| Primary Light | `#818cf8` | `indigo-400` | Hover states |
| Success | `#10b981` | `emerald-500` | Completed, success |
| Warning | `#f59e0b` | `amber-500` | In-progress, medium priority |
| Danger | `#ef4444` | `red-500` | High priority, errors |
| Purple | `#8b5cf6` | `violet-500` | Secondary accent |
| Background | `#f8fafc` | `slate-50` | Page background |
| Card | `#ffffff` | `white` | Card backgrounds |
| Text Primary | `#1e293b` | `slate-800` | Headings |
| Text Secondary | `#64748b` | `slate-500` | Body text |
| Text Muted | `#94a3b8` | `slate-400` | Subtitles, hints |

### Category Colors

| Category | Color | Hex |
|----------|-------|-----|
| Health | Emerald | `#10b981` |
| Fitness | Red | `#ef4444` |
| Mindfulness | Purple | `#a78bfa` |
| Learning | Violet | `#8b5cf6` |
| Productivity | Amber | `#f59e0b` |
| Sleep | Indigo | `#6366f1` |
| Hydration | Blue | `#3b82f6` |
| Other | Gray | `#6b7280` |

### Icon Mapping (HabitCard)

```typescript
// components/habits/HabitCard.tsx
const iconMap: Record<string, React.ElementType> = {
    Droplets,   // 💧 Water/hydration
    BookOpen,   // 📚 Reading/learning
    Dumbbell,   // 🏋️ Workout/fitness
    Moon,       // 🌙 Sleep
    Brain,      // 🧠 Mindfulness
    Flame,      // 🔥 Streaks
};
```

### Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page title) | 24px | 700 | 1.2 |
| H2 (Section) | 18px | 700 | 1.3 |
| H3 (Card title) | 16px | 600 | 1.4 |
| Body | 14px | 400 | 1.5 |
| Small | 12px | 400 | 1.5 |
| Caption | 11px | 500 | 1.4 |

---

## 📘 Key Type Definitions

**Location:** `types/index.ts`

### Habit
```typescript
interface Habit {
  id: string;                    // "h1", "h2", etc.
  title: string;                 // "Drink Water"
  icon: string;                  // "Droplets", "BookOpen", etc.
  category: HabitCategory;       // "health" | "fitness" | ...
  color: string;                 // Hex color
  streak: number;                // Current streak count
  completedToday: boolean;       // Today's completion status
  weeklyProgress: boolean[];     // 7 days, index 0 = Monday
  target: number;                // Times per day (e.g., 8 glasses)
  repeatDays: RepeatDay[];       // ["mon", "tue", ...]
  reminderTime?: string;         // "09:00"
  createdAt: string;             // ISO date
}
```

### Task
```typescript
interface Task {
  id: string;                    // "t1", "t2", etc.
  title: string;                 // Task description
  time?: string;                 // "14:00" (24h format)
  date: string;                  // "2026-04-02" (YYYY-MM-DD)
  status: TaskStatus;            // "pending" | "in-progress" | "done"
  priority: TaskPriority;        // "low" | "medium" | "high"
  color: string;                 // Hex accent color
  tags?: string[];               // ["work", "personal"]
}
```

### User
```typescript
interface User {
  name: string;                  // Full name
  firstName: string;             // First name only
  email: string;                 // Email address
  avatar?: string;               // URL to avatar image
}
```

**⚠️ Type Conflict:** `NavItem` in `types/index.ts` defines `icon: string`, but the actual usage in `constants/navigation.ts` uses `LucideIcon` from `lucide-react`. The types one is unused.

---

## ⚡ Quick Reference

### Import Aliases

```typescript
// tsconfig.json paths
"@/*": ["./*"]

// Usage
import { Button } from "@/components/ui/button";
import { habitService } from "@/services/habit.service";
import { useHabits } from "@/hooks";
import type { Habit } from "@/types";
```

### Utility Functions (lib/utils.ts)

```typescript
// Class merging
import { cn } from "@/lib/utils";
cn("base-class", condition && "conditional-class");

// Greeting based on time
getGreeting(); // "Good morning" | "Good afternoon" | "Good evening"

// Date formatting
formatDate(date);           // "Today" | "Tomorrow" | "Yesterday" | "Apr 2, 2026"
getTodayLabel();            // "Wednesday, April 2, 2026"

// Math
calcProgress(3, 5);         // 60 (percentage)
getInitials("John Doe");    // "JD"
formatStreak(5);            // "5 days"
```

### Status Configurations

```typescript
// Task statuses (TaskListCard.tsx)
const statusConfig = {
    done: { label: "Done", icon: Check, color: "#10b981" },
    "in-progress": { label: "In Progress", icon: Clock, color: "#f59e0b" },
    pending: { label: "Pending", icon: Circle, color: "#94a3b8" },
};
```

### Mock Data Access

```typescript
// lib/mock-data.ts
import { mockUser, mockHabits, mockTasks, mockWeeklyData, mockHeatmapData, categoryConfig } from "@/lib/mock-data";
```

---

## 📝 Code Style Guidelines

### Component Template

```typescript
"use client";  // Required for client components

import { useState } from "react";  // React first
import { Plus } from "lucide-react";  // Third-party
import { Button } from "@/components/ui/button";  // Components
import { useHabits } from "@/hooks";  // Hooks
import { habitService } from "@/services";  // Services
import { mainNavItems } from "@/constants";  // Constants
import { cn } from "@/lib/utils";  // Utils
import type { Habit } from "@/types";  // Types last

interface MyComponentProps {
    title: string;
    habit?: Habit;
    onAction?: () => void;
}

export function MyComponent({ title, habit, onAction }: MyComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="bg-white rounded-2xl p-5 border border-slate-100">
            {/* content */}
        </div>
    );
}
```

### Styling Conventions

```typescript
// Use cn() for conditional classes
className={cn(
    "base-classes always-present",
    condition && "conditional-classes",
    isActive 
        ? "active-state-classes" 
        : "inactive-state-classes hover: something"
)}

// Common patterns
"rounded-2xl"          // Cards, large elements
"rounded-xl"           // Buttons, inputs
"rounded-lg"           // Small elements, tags
"rounded-full"         // Avatars, pills

"p-5"                  // Card padding
"px-6 py-7"           // Page padding
"gap-4"               // Grid gaps

"text-sm"              // Body text
"text-xs"              // Captions
"text-[11px]"          // Tiny text (custom size)

"font-600"             // Semibold (use style prop for custom fonts)
"font-bold"            // Bold
```

### Font Weight Pattern

Tailwind doesn't have `font-600` by default, so we use inline styles:

```tsx
<h1 className="text-slate-800" style={{ fontWeight: 700 }}>
```

---

## 🔧 Common Patterns

### 1. Loading State

```typescript
const { habits, isLoading, error } = useHabits();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <HabitList habits={habits} />;
```

### 2. Toggle with Service

```typescript
// ❌ Wrong: Local state only
const [completed, setCompleted] = useState(habit.completedToday);

// ✅ Right: Call service
const handleToggle = async () => {
    await habitService.toggleComplete(habit.id);
    refresh(); // Refresh from service
};
```

### 3. Form Handling

```typescript
const [formData, setFormData] = useState({ title: "" });
const [errors, setErrors] = useState<{ title?: string }>({});

const validate = () => {
    const errs: typeof errors = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    return errs;
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
        setErrors(errs);
        return;
    }
    await habitService.create(formData);
};
```

### 4. Dialog/Modal Pattern

```typescript
const [dialogOpen, setDialogOpen] = useState(false);

// In JSX
<QuickAddDialog 
    open={dialogOpen} 
    onOpenChange={setDialogOpen} 
/>
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Hook Not Updating UI
**Problem:** Changed data in service but UI doesn't update.

**Cause:** Components use mock data directly, not hooks.

**Fix:** See `plan.md` — integrate hooks into components.

### Issue 2: Hardcoded Values
**Problem:** Streak shows "21" everywhere regardless of actual data.

**Locations:**
- `WelcomeHero.tsx` line 30
- `AppSidebar.tsx` line 72
- `StatsOverview.tsx` lines 72-85

**Fix:** Calculate from `habits` data:
```typescript
const maxStreak = Math.max(...habits.map(h => h.streak));
```

### Issue 3: Type Conflict
**Problem:** Two different `NavItem` types.

**Fix:** Remove from `types/index.ts`, use the one in `constants/navigation.ts`.

### Issue 4: Font ESLint Warning
**Problem:** `no-page-custom-font` warning.

**Fix:** Use `next/font/google` instead of `<link>` tags in `layout.tsx`.

### Issue 5: Hydration Mismatch
**Problem:** React hydration errors.

**Cause:** Random data generation on server vs client.

**Fix:** Already handled — mock data uses deterministic seeded PRNG.

---

## 🖥 Development Commands

```bash
# Install dependencies (use pnpm ONLY)
pnpm install

# Start development server
pnpm dev
# → http://localhost:3000

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint

# Add shadcn component
npx shadcn add button
```

---

## ➕ Adding New Features

### Adding a New Page

1. Create directory: `app/(app)/newpage/`
2. Add `page.tsx`:
   ```typescript
   import { TopNavbar } from "@/components/layout/TopNavbar";
   
   export default function NewPage() {
       return (
           <>
               <TopNavbar title="New Page" />
               <main className="pt-16 px-6 py-7 max-w-[1400px]">
                   {/* content */}
               </main>
           </>
       );
   }
   ```
3. Add to sidebar in `constants/navigation.ts`:
   ```typescript
   { id: "newpage", label: "New Page", icon: NewIcon, href: "/newpage" }
   ```

### Adding a New Service Method

1. Add method to service class in `services/<name>.service.ts`
2. Maintain in-memory array updates
3. Add simulated delay: `await delay(300)`
4. Export from `services/index.ts` if new service

### Adding a New Component

1. Determine category:
   - UI primitive? → `components/ui/` (use shadcn add)
   - Layout? → `components/layout/`
   - Feature-specific? → `components/<feature>/`
   - Shared? → `components/shared/`
2. Follow component template above
3. Export from folder's `index.ts` if exists

### Adding a New Type

1. Add to `types/index.ts`
2. Export the type
3. Import with `import type { MyType } from "@/types"`

---

## 🚀 Deployment

**Platform:** Vercel (configured)

```bash
# Build command
pnpm build

# Output directory
.next
```

**Environment Variables:**
```bash
# For future API integration
NEXT_PUBLIC_API_URL=https://api.flowday.app
```

---

## 📚 Additional Resources

- **plan.md** — Current fix plan and task list
- **components.json** — shadcn/ui configuration
- **next.config.ts** — Next.js configuration

---

## ❓ Need Help?

If something doesn't work:

1. Check if build passes: `pnpm build`
2. Check lint: `pnpm lint`
3. Verify import paths use `@/` aliases
4. Ensure `"use client"` directive for client components
5. Check that types match actual usage
6. Review `plan.md` for known issues
