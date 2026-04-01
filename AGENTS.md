# FlowDay — AI Coding Agent Guide

> **Project**: FlowDay — Personal Planner & Habit Tracker  
> **Type**: Next.js 16 Web Application  
> **Language**: English (US)

---

## Project Overview

FlowDay is a premium personal productivity dashboard for managing habits, daily tasks, and tracking progress. It features a modern, clean UI with habit tracking, task planning, analytics visualization, and note-taking capabilities.

**Key Features:**
- Habit tracking with streak counting and weekly progress
- Task management with priorities (low/medium/high) and status tracking
- Daily planner with mini calendar
- Analytics dashboard with charts and heatmaps
- Notes section
- Authentication pages (login/register)
- Responsive sidebar navigation

---

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript | 5.x |
| UI Library | React | 19.2.3 |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui + Base UI | 4.x / 1.2.0 |
| Icons | Lucide React | 0.577.0 |
| Charts | Recharts | 3.8.0 |
| Date Utils | date-fns | 4.1.0 |
| Package Manager | pnpm | - |

---

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── (app)/                    # Main app routes (with sidebar layout)
│   │   ├── dashboard/page.tsx    # Dashboard home
│   │   ├── habits/page.tsx       # Habits list
│   │   ├── planner/page.tsx      # Task planner
│   │   ├── analytics/page.tsx    # Analytics charts
│   │   ├── notes/page.tsx        # Notes page
│   │   ├── settings/page.tsx     # Settings page
│   │   └── layout.tsx            # App layout with sidebar
│   ├── (auth)/                   # Auth routes (no sidebar)
│   │   ├── login/page.tsx        # Login page
│   │   ├── register/page.tsx     # Registration page
│   │   └── layout.tsx            # Auth layout
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Home (redirects to /login)
│   └── globals.css               # Global styles, CSS variables
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── AppSidebar.tsx        # Left navigation sidebar
│   │   └── TopNavbar.tsx         # Top navigation bar
│   ├── dashboard/                # Dashboard components
│   ├── habits/                   # Habit-related components
│   ├── planner/                  # Planner/calendar components
│   ├── analytics/                # Chart components
│   └── shared/                   # Shared/reusable components
│
├── config/                       # Configuration files
│   └── site.ts                   # Site metadata, URLs, branding
│
├── constants/                    # App constants
│   ├── navigation.ts             # Navigation items configuration
│   ├── routes.ts                 # Route path constants
│   ├── messages.ts               # Error/success messages
│   └── index.ts                  # Barrel exports
│
├── hooks/                        # Custom React hooks
│   ├── use-habits.ts             # Habit data fetching & state
│   ├── use-tasks.ts              # Task data fetching & state
│   ├── use-user.ts               # User data fetching & state
│   └── index.ts                  # Barrel exports
│
├── services/                     # Business logic & API calls
│   ├── habit.service.ts          # Habit CRUD operations
│   ├── task.service.ts           # Task CRUD operations
│   ├── user.service.ts           # User operations
│   └── index.ts                  # Barrel exports
│
├── lib/                          # Utility functions
│   ├── utils.ts                  # cn(), date helpers, formatting
│   └── mock-data.ts              # Mock data for development
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Habit, Task, User types, etc.
│
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs             # ESLint configuration
├── postcss.config.mjs            # PostCSS (Tailwind v4)
└── components.json               # shadcn/ui configuration
```

---

## Architecture Patterns

### Service Layer Pattern

All data access goes through service classes in `services/`:

```typescript
// services/habit.service.ts
class HabitService {
    async getAll(): Promise<Habit[]> { ... }
    async create(input: CreateHabitInput): Promise<Habit> { ... }
    async update(id: string, input: UpdateHabitInput): Promise<Habit | null> { ... }
    async delete(id: string): Promise<boolean> { ... }
}

// Usage in components or hooks
import { habitService } from "@/services/habit.service";
const habits = await habitService.getAll();
```

**Benefits:**
- Easy to swap mock data for real API
- Centralized error handling
- Consistent data fetching interface

### Custom Hooks Pattern

Data fetching uses custom hooks with loading/error states:

```typescript
// hooks/use-habits.ts
export function useHabits() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    // ... fetch logic
    return { habits, isLoading, error, refresh, toggleHabit };
}

// Usage in components
const { habits, isLoading, error } = useHabits();
```

### Constants Pattern

Centralized configuration in `constants/`:

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
    DASHBOARD: "/dashboard",
    // ...
} as const;
```

---

## Build and Development Commands

All commands use `pnpm`:

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

---

## Key Type Definitions

Located in `types/index.ts`:

**Habit:**
```typescript
interface Habit {
  id: string;
  title: string;
  icon: string;
  category: HabitCategory;
  color: string;
  streak: number;
  completedToday: boolean;
  weeklyProgress: boolean[];
  target: number;
  repeatDays: RepeatDay[];
  reminderTime?: string;
  createdAt: string;
}
```

**Task:**
```typescript
interface Task {
  id: string;
  title: string;
  time?: string;
  date: string;
  status: "pending" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  color: string;
  tags?: string[];
}
```

---

## Code Style Guidelines

### Component Structure
- Use functional components with hooks
- Add `"use client"` directive for client components
- Use TypeScript interfaces for props

Example:
```typescript
"use client";

import { useState } from "react";

interface Props {
  title: string;
}

export function MyComponent({ title }: Props) {
  const [count, setCount] = useState(0);
  return <div>{title}</div>;
}
```

### Styling Conventions
- Use Tailwind CSS utility classes
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Follow the existing color scheme (indigo primary)
- Use CSS variables for theming (defined in `globals.css`)

### Naming Conventions
- Components: PascalCase (e.g., `HabitCard.tsx`)
- Hooks: camelCase with `use` prefix
- Utilities: camelCase
- Types/Interfaces: PascalCase
- Services: camelCase with `.service.ts` suffix
- Constants: UPPER_SNAKE_CASE for values, PascalCase for types

### Import Order
1. React/Next.js imports
2. Third-party libraries
3. Internal components (`@/components/*`)
4. Hooks (`@/hooks/*`)
5. Services (`@/services/*`)
6. Constants (`@/constants/*`)
7. Config (`@/config/*`)
8. Utils (`@/lib/*`)
9. Types (`@/types`)

---

## UI Component Patterns

The project uses **shadcn/ui** with **Base UI** primitives:

- Components are in `components/ui/`
- Use `class-variance-authority` (cva) for variants
- Components support variants via props (e.g., `variant="outline"`, `size="sm"`)

Adding a new shadcn component:
```bash
npx shadcn add button
```

---

## Mock Data

Development data is in `lib/mock-data.ts`:
- `mockUser` - User profile data
- `mockHabits` - Sample habits with streaks
- `mockTasks` - Sample tasks for today
- `mockWeeklyData` - Analytics data
- `mockHeatmapData` - Heatmap data (84 days, deterministic for SSR)
- `categoryConfig` - Category labels and colors

The mock data uses a deterministic seeded PRNG to prevent hydration mismatches.

**Note:** Services wrap mock data with simulated network delay for realistic development.

---

## Routing Structure

| Route | Layout | Description |
|-------|--------|-------------|
| `/` | Root | Redirects to `/login` |
| `/login` | Auth | Login page |
| `/register` | Auth | Registration page |
| `/dashboard` | App | Main dashboard |
| `/habits` | App | Habit tracker |
| `/planner` | App | Task planner |
| `/analytics` | App | Analytics view |
| `/notes` | App | Notes page |
| `/settings` | App | Settings page |

---

## Testing Strategy

Currently, this project does not have automated tests configured. When adding tests:
- Use Vitest or Jest for unit tests
- Use React Testing Library for component tests
- Use Playwright for E2E tests

---

## Security Considerations

- Authentication is currently client-side only (mock)
- No backend API integration yet
- Environment variables should be added for production
- No sensitive data in mock files for production

---

## Deployment

The project is configured for deployment on **Vercel**:

```bash
# Build command
pnpm build

# Output directory
.next
```

Environment variables (if needed):
- `NEXT_PUBLIC_*` for client-side env vars

---

## Common Development Tasks

### Adding a New Page
1. Create directory in `app/(app)/` or `app/(auth)/`
2. Add `page.tsx` with the component
3. Update sidebar navigation in `constants/navigation.ts` if needed

### Adding a New UI Component
1. Check if shadcn has it: `npx shadcn add <component>`
2. Or create manually in `components/ui/`
3. Export from the component file

### Adding a New Service
1. Create `services/<name>.service.ts`
2. Add to `services/index.ts` barrel export
3. Use the service in hooks or components

### Adding a New Hook
1. Create `hooks/use-<name>.ts`
2. Add to `hooks/index.ts` barrel export
3. Import from `@/hooks`

### Adding Types
1. Add to `types/index.ts`
2. Export the type
3. Import in components with `import type { MyType } from "@/types";`

### Adding Constants
1. Add to appropriate file in `constants/` or create new file
2. Add to `constants/index.ts` barrel export if needed
3. Import from `@/constants`

---

## Important Notes

- **Tailwind CSS v4**: Uses new CSS-based configuration (no `tailwind.config.js`)
- **Next.js 16**: Uses the App Router exclusively
- **React 19**: Latest React version with new features
- **Mock Data First**: All data is mocked; no real backend yet
- **SSR-Safe**: Mock data uses deterministic generation to avoid hydration issues
- **Service Layer**: All data access goes through services for easy API migration
