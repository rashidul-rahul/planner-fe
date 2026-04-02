# FlowDay Fix Plan

> Document outlining all fixes and improvements needed for the FlowDay project.

---

## 1. Type System Fixes

### 1.1 Remove Unused `NavItem` Type
**File:** `types/index.ts` (lines 88-96)

The `NavItem` interface in types uses `icon: string`, but the actual usage in `constants/navigation.ts` uses `LucideIcon` from lucide-react. This type is redundant.

**Action:**
- Remove the `NavItem` interface from `types/index.ts`
- The one in `constants/navigation.ts` is the source of truth

---

## 2. Integrate Hooks into Components

### 2.1 Dashboard Page
**File:** `app/(app)/dashboard/page.tsx`

Currently using `mockHabits` directly. Should use `useHabits()` hook.

**Changes:**
- Replace `import { mockHabits } from "@/lib/mock-data"` with `import { useHabits } from "@/hooks"`
- Add loading state handling
- Add error state handling

### 2.2 Habits Page
**File:** `app/(app)/habits/page.tsx`

Same issue - using `mockHabits` directly instead of hook.

**Changes:**
- Import and use `useHabits()` hook
- Add loading spinner while fetching
- Handle empty state

### 2.3 Planner Page
**File:** `app/(app)/planner/page.tsx`

Should use `useTasks()` hook instead of passing mock data to `TaskListCard`.

**Changes:**
- Import `useTasks` from hooks
- Pass real task data to `TaskListCard`
- Handle loading/error states

---

## 3. Fix Hardcoded Values

### 3.1 TopNavbar User Initials
**File:** `components/layout/TopNavbar.tsx` (line 58)

Currently: `{mockUser.firstName[0]}S` → Hardcoded "RS"

**Fix:** Use `getInitials()` utility from `@/lib/utils`

```tsx
// Current
<AvatarFallback>
  {mockUser.firstName[0]}S
</AvatarFallback>

// Fixed
<AvatarFallback>
  {getInitials(mockUser.name)}
</AvatarFallback>
```

### 3.2 WelcomeHero Streak
**File:** `components/dashboard/WelcomeHero.tsx` (line 30)

Currently: Hardcoded "21-day streak"

**Fix:** Calculate from habits data passed as prop or from hook

### 3.3 StatsOverview Task Stats
**File:** `components/dashboard/StatsOverview.tsx` (lines 72-85)

Currently: Hardcoded "2/5" tasks, "3 tasks pending"

**Fix:** Calculate from actual tasks data using `useTasks()` hook

### 3.4 AppSidebar Streak Card
**File:** `components/layout/AppSidebar.tsx` (line 72)

Currently: Hardcoded "🔥 21 Days"

**Fix:** Calculate max streak from habits data

---

## 4. Connect QuickAddDialog to Services

### 4.1 Habit Creation
**File:** `components/shared/QuickAddDialog.tsx` (lines 67-74)

Currently only logs to console. Should call `habitService.create()`.

**Changes:**
- Import `habitService` from `@/services`
- Call `habitService.create()` with form data
- Show success toast/notification
- Refresh habits list after creation

### 4.2 Task Creation
Same file - implement task creation via `taskService.create()`

---

## 5. Fix State Persistence

### 5.1 HabitCard Toggle
**File:** `components/habits/HabitCard.tsx` (lines 33-47)

Currently uses local state only. Should:
- Call `habitService.toggleComplete()`
- Update streak calculation properly
- Sync with parent component

### 5.2 TaskListCard Toggle
**File:** `components/planner/TaskListCard.tsx` (lines 22-30)

Currently toggles between done/pending only. Should:
- Call `taskService.toggleStatus()` for proper 3-state cycle
- Or use `taskService.update()` to set specific status

---

## 6. Fix Font Loading (ESLint Warning)

**File:** `app/layout.tsx` (lines 15-21)

Currently uses `<link>` tags for Google Fonts.

**Fix:** Use `next/font/google` for better optimization:

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800']
})

// Apply to body
<body className={cn("antialiased", inter.className)}>
```

---

## 7. Empty Pages Implementation

### 7.1 Notes Page
**File:** `app/(app)/notes/page.tsx`

Currently just a placeholder. Should:
- Add note CRUD operations
- Create note list component
- Create note editor component
- Add localStorage persistence (until backend ready)

### 7.2 Settings Page (Completely Missing)
**File:** `app/(app)/settings/page.tsx`

**Current State:** Just a placeholder with "Settings coming soon" message.

**What's Missing (Comprehensive Settings Module):**

#### A. Profile Settings Section
- **Display Name** - Editable full name (updates `user.name` and `user.firstName`)
- **Email Address** - Editable email with validation
- **Avatar Upload** - File upload with preview, crop functionality
- **Bio/About** - Short description (new field needed in User type)

#### B. Appearance Settings Section
- **Theme Toggle** - Light / Dark / System (CSS already has `@custom-variant dark` but no dark theme colors defined)
- **Color Accent** - Primary color picker (indigo, blue, violet, etc.)
- **Font Size** - Small / Default / Large
- **Reduced Motion** - Accessibility toggle for animations

#### C. Notification Settings Section
- **Email Notifications** - Toggle for weekly summaries
- **Push Notifications** - Toggle for habit reminders
- **Reminder Time** - Default time for habit reminders
- **Sound Effects** - Toggle for UI sounds

#### D. Account Settings Section
- **Change Password** - Current password + new password fields
- **Export Data** - Download habits/tasks as JSON/CSV
- **Import Data** - Upload backup file
- **Delete Account** - With confirmation dialog (destructive action)

#### E. App Settings Section
- **Language** - Locale selection (currently hardcoded to English)
- **Start of Week** - Monday / Sunday (affects calendar display)
- **Time Format** - 12h / 24h
- **Default Task Priority** - Low / Medium / High

#### F. Logout Button
- Clear session/localStorage
- Redirect to login page

**Required New Components:**
```
components/settings/
├── ProfileSection.tsx
├── AppearanceSection.tsx
├── NotificationSection.tsx
├── AccountSection.tsx
├── AppSettingsSection.tsx
└── SettingsSidebar.tsx (for mobile navigation between sections)
```

**Required New Types:**
```typescript
// types/index.ts
interface UserSettings {
    theme: 'light' | 'dark' | 'system';
    accentColor: string;
    fontSize: 'small' | 'default' | 'large';
    reducedMotion: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
    reminderTime: string;
    soundEffects: boolean;
    startOfWeek: 'monday' | 'sunday';
    timeFormat: '12h' | '24h';
    defaultTaskPriority: TaskPriority;
}

interface User {
    name: string;
    firstName: string;
    avatar?: string;
    email: string;
    bio?: string;  // NEW
    settings?: UserSettings;  // NEW
}
```

**Required Service Updates:**
```typescript
// services/user.service.ts
class UserService {
    // Existing methods...
    
    async updateSettings(settings: Partial<UserSettings>): Promise<User> {
        // Update user settings
    }
    
    async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
        // Validate current password and update
    }
    
    async deleteAccount(): Promise<boolean> {
        // Clear all user data
    }
    
    async exportData(): Promise<{ habits: Habit[]; tasks: Task[]; user: User }> {
        // Export all user data
    }
    
    async importData(data: string): Promise<boolean> {
        // Validate and import data
    }
}
```

**Required CSS Updates:**
```css
/* app/globals.css - Add dark theme colors */
.dark {
  --background: oklch(0.18 0.015 240);
  --foreground: oklch(0.95 0.004 240);
  /* ... all other dark theme variables */
}
```

**Implementation Priority:**
1. **P1:** Profile section (name, email, avatar)
2. **P1:** Logout functionality
3. **P2:** Appearance section (theme toggle)
4. **P2:** Notification settings
5. **P3:** Account settings (password, export/import)
6. **P3:** App settings (language, time format)

---

## 8. Analytics Data Connection

**Files:** 
- `components/analytics/AnalyticsChart.tsx`
- `components/analytics/HeatmapChart.tsx`

Currently using `mockWeeklyData` and `mockHeatmapData` directly.

**Fix:** Create analytics service/hook to calculate real data from habits

---

## 9. Date Utilities Fix

### 9.1 getTodayHabits() in HabitService
**File:** `services/habit.service.ts` (line 42-46)

Uses `toLocaleDateString()` which may return inconsistent day abbreviations.

**Fix:** Use `date-fns` format function for consistency:

```ts
const today = format(new Date(), 'EEE').toLowerCase() as RepeatDay;
```

---

## 10. Missing Exports

### 10.1 hooks/index.ts
**File:** `hooks/index.ts`

Ensure all hooks are properly exported for barrel imports.

---

## Priority Order

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| P0 | Integrate hooks into pages | Medium | High |
| P0 | Connect QuickAddDialog to services | Low | High |
| P1 | Fix hardcoded values | Low | Medium |
| P1 | Fix HabitCard/TaskListCard persistence | Medium | High |
| P2 | Fix font loading | Low | Low |
| P2 | Remove unused NavItem type | Low | Low |
| P3 | Implement Notes page | High | Medium |
| P3 | Implement Settings page | Medium | Medium |
| P3 | Connect Analytics to real data | Medium | Medium |

---

## Files to Modify

1. `types/index.ts` - Remove unused NavItem
2. `app/layout.tsx` - Fix font loading
3. `app/(app)/dashboard/page.tsx` - Use hooks
4. `app/(app)/habits/page.tsx` - Use hooks
5. `app/(app)/planner/page.tsx` - Use hooks
6. `components/layout/TopNavbar.tsx` - Fix initials
7. `components/layout/AppSidebar.tsx` - Fix streak
8. `components/dashboard/WelcomeHero.tsx` - Dynamic streak
9. `components/dashboard/StatsOverview.tsx` - Dynamic task stats
10. `components/habits/HabitCard.tsx` - Service integration
11. `components/planner/TaskListCard.tsx` - Service integration
12. `components/shared/QuickAddDialog.tsx` - Service integration
13. `services/habit.service.ts` - Fix date utility
14. `app/(app)/notes/page.tsx` - Full implementation
15. `app/(app)/settings/page.tsx` - Full implementation

---

## 11. Incomplete Features (Newly Discovered)

### 11.1 Search Functionality
**File:** `components/layout/TopNavbar.tsx` (lines 26-33)

The search input is purely decorative - it has no functionality.

**Current State:**
- Input field renders but has no `onChange`, `value`, or `onSubmit` handlers
- No search logic exists anywhere in the app

**Fix:**
- Add search state management
- Filter habits/tasks based on search query
- Show search results dropdown or navigate to search page
- Consider debouncing the search input

### 11.2 Notifications System
**File:** `components/layout/TopNavbar.tsx` (lines 37-41)

Notification bell button is non-functional. The red dot is hardcoded.

**Current State:**
- Button has no `onClick` handler
- No notification panel/dropdown exists
- Red notification badge is always visible (hardcoded)

**Fix:**
- Create notifications panel/dropdown
- Add notification state management
- Implement notification types (habit reminders, task due, streak milestones)
- Remove hardcoded notification badge

### 11.3 "Remember Me" Login
**File:** `app/(auth)/login/page.tsx` (lines 266-303)

The "Remember me for 30 days" checkbox has no actual functionality.

**Current State:**
- Checkbox UI exists and toggles state
- `remember` state is never used
- No persistence mechanism implemented

**Fix:**
- Store login session in localStorage if "Remember me" is checked
- Check for stored session on app load
- Implement session expiration (30 days)
- Add logout functionality to clear session

### 11.4 "Forgot Password" Page
**File:** `app/(auth)/login/page.tsx` (line 223)

Link to `/forgot-password` exists but the page doesn't exist.

**Current State:**
- Link href="/forgot-password" renders
- No route or page exists for this URL → will show 404

**Fix:**
- Create `app/(auth)/forgot-password/page.tsx`
- Implement password reset form
- Add email validation and success state

### 11.5 HabitCard Missing Features
**File:** `components/habits/HabitCard.tsx`

Several habit features are displayed but not interactive:

**Missing:**
1. **No delete habit functionality** - No delete button/menu
2. **No edit habit functionality** - No edit button/menu
3. **Icon mapping is incomplete** - Only 6 icons mapped but habit can have any string
4. **Weekly progress is static** - Shows mock data, doesn't update when habit is toggled
5. **No reminder functionality** - Reminder time is displayed nowhere and not triggered

### 11.6 MiniCalendar Not Connected to Tasks
**File:** `components/planner/MiniCalendar.tsx`

Calendar is isolated - selecting a date doesn't affect task display.

**Current State:**
- `selected` date state exists but is only used for styling
- `TaskListCard` always shows today's tasks regardless of selected date

**Fix:**
- Pass selected date to `TaskListCard` as prop
- Filter tasks by selected date in `TaskListCard`
- Show selected date indicator in task list

### 11.7 Analytics Charts Use Static Data
**Files:** 
- `components/analytics/AnalyticsChart.tsx`
- `components/analytics/HeatmapChart.tsx`

Both charts use pre-defined mock data arrays that never change.

**Current State:**
- `mockWeeklyData` is static array with fixed values
- `mockHeatmapData` is generated once with seeded random
- Charts don't reflect actual habit completion activity

**Fix:**
- Calculate weekly data from actual habit completion history
- Generate heatmap data from real habit completions
- Update charts when habits are toggled

### 11.8 "Add Habit" Button on Dashboard
**File:** `app/(app)/dashboard/page.tsx` (lines 44-54)

The "Add Habit" button in the Today's Habits section does nothing.

**Current State:**
- Button has no `onClick` handler
- Should open QuickAddDialog with habit type pre-selected

### 11.9 "View All" Button in WelcomeHero
**File:** `components/dashboard/WelcomeHero.tsx` (lines 42-49)

"View All" button is non-functional.

**Current State:**
- Button has no `onClick` or navigation
- Should navigate to `/habits`

### 11.10 No Data Persistence
**Files:** All service files

All data is lost on page refresh because:
- Services store data in memory only (`private habits: Habit[]`)
- No localStorage usage
- No backend API

**Current Behavior:**
- Create a habit → works until refresh
- Toggle a habit → reverts on refresh
- Complete a task → reverts on refresh

**Fix Options:**
1. Add localStorage persistence to services
2. Add sessionStorage for temporary persistence
3. Implement backend API

### 11.11 No Logout Functionality
**Files:** All pages

There's no way to logout once logged in.

**Missing:**
- Logout button in sidebar or top navbar
- Clear session functionality
- Redirect to login on logout

### 11.12 QuickAddDialog Issues
**File:** `components/shared/QuickAddDialog.tsx`

Several incomplete features:

1. **Task creation incomplete** (line 165-240)
   - When "Task" type is selected, category/repeat/reminder fields disappear
   - But task needs date, priority fields which are missing
   
2. **No form validation**
   - Title is the only field checked (just for empty)
   - No validation for time format
   - No validation for target being a number

3. **Icon mismatch**
   - Dialog shows emoji icons (💧, 📚)
   - But HabitCard expects Lucide icon names ("Droplets", "BookOpen")
   - Creating a habit with emoji icon will break the habit card display

### 11.13 StatsOverview Hardcoded Trends
**File:** `components/dashboard/StatsOverview.tsx`

All trend percentages are hardcoded:
- Line 25: `trend={12}`
- Line 57: `trend={5}`
- Line 76: `trend={-8}`
- Line 95: `trend={3}`

These should be calculated from historical data.

### 11.14 No Loading States in UI
**Files:** All page files

Despite hooks having `isLoading` state, no loading UI exists:
- No skeleton screens
- No loading spinners
- No shimmer effects

### 11.15 No Error Handling UI
**Files:** All page files

Despite hooks having `error` state, no error UI exists:
- No error messages shown to user
- No retry buttons
- No error boundaries

### 11.16 Empty States Missing
**Files:** Various

Several components lack empty states:
- `HabitsPage` - No "No habits yet" state if all habits deleted
- `TaskListCard` - No "No tasks for today" state
- `DashboardPage` - No handling for empty habits/tasks

### 11.17 "View full planner" Link Non-Functional
**File:** `app/(app)/dashboard/page.tsx` (lines 69-77)

Button exists but does nothing. Should navigate to `/planner`.

### 11.18 "Full report" Link Non-Functional
**File:** `app/(app)/dashboard/page.tsx` (lines 92-100)

Button exists but does nothing. Should navigate to `/analytics`.

---

## 12. UI/UX Issues

### 12.1 Focus Score is Meaningless
**File:** `components/dashboard/StatsOverview.tsx` (lines 88-118)

"Focus Score" shows hardcoded "84" with no explanation or calculation.

**Options:**
1. Remove it entirely
2. Calculate based on actual metrics (habit completion rate × task completion rate)
3. Replace with a different meaningful stat

### 12.2 WelcomeHero Hardcoded Streak Message
**File:** `components/dashboard/WelcomeHero.tsx` (line 30)

"You're on a 21-day streak" is hardcoded regardless of actual streak.

### 12.3 AppSidebar Hardcoded Streak
**File:** `components/layout/AppSidebar.tsx` (line 72)

"🔥 21 Days" is hardcoded and doesn't reflect actual best streak.

---

## Updated Priority Order

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| **P0 (Critical)** ||||
| P0 | Connect QuickAddDialog to services | Low | High |
| P0 | Fix HabitCard toggle persistence | Medium | High |
| P0 | Fix TaskListCard toggle persistence | Medium | High |
| P0 | Add localStorage persistence | Medium | High |
| **P1 (High)** ||||
| P1 | Integrate hooks into pages | Medium | High |
| P1 | Fix hardcoded values | Low | Medium |
| P1 | Connect MiniCalendar to TaskListCard | Low | Medium |
| P1 | Fix "Add Habit" button functionality | Low | Medium |
| **P2 (Medium)** ||||
| P2 | Fix font loading | Low | Low |
| P2 | Remove unused NavItem type | Low | Low |
| P2 | Fix QuickAddDialog task creation form | Medium | Medium |
| P2 | Add forgot password page | Low | Medium |
| P2 | Add "View All" and navigation links | Low | Low |
| **P2 (Medium)** ||||
| P2 | Settings - Profile Section | Medium | High |
| P2 | Settings - Logout Functionality | Low | High |
| P2 | Fix font loading | Low | Low |
| P2 | Remove unused NavItem type | Low | Low |
| P2 | Fix QuickAddDialog task creation form | Medium | Medium |
| P2 | Add forgot password page | Low | Medium |
| P2 | Add "View All" and navigation links | Low | Low |
| **P3 (Low)** ||||
| P3 | Settings - Appearance/Theme | Medium | Medium |
| P3 | Settings - Notifications | Medium | Medium |
| P3 | Settings - Account (password, export) | Medium | Medium |
| P3 | Settings - App Preferences | Low | Low |
| P3 | Implement Notes page | High | Medium |
| P3 | Connect Analytics to real data | Medium | Medium |
| P3 | Implement search functionality | Medium | Low |
| P3 | Implement notifications system | High | Low |
| P3 | Add loading states | Medium | Medium |
| P3 | Add error handling UI | Medium | Medium |

---

## Extended Files to Modify

### Critical Fixes (P0)
1. `components/shared/QuickAddDialog.tsx` - Connect to services + fix task form
2. `components/habits/HabitCard.tsx` - Service integration + delete/edit
3. `components/planner/TaskListCard.tsx` - Service integration
4. `services/habit.service.ts` - Add localStorage persistence
5. `services/task.service.ts` - Add localStorage persistence

### High Priority (P1)
6. `app/(app)/dashboard/page.tsx` - Use hooks + fix buttons
7. `app/(app)/habits/page.tsx` - Use hooks
8. `app/(app)/planner/page.tsx` - Use hooks + connect calendar
9. `components/layout/TopNavbar.tsx` - Fix initials + search + notifications
10. `components/layout/AppSidebar.tsx` - Fix streak
11. `components/dashboard/WelcomeHero.tsx` - Dynamic streak + View All link
12. `components/dashboard/StatsOverview.tsx` - Dynamic task stats + trends
13. `components/planner/MiniCalendar.tsx` - Connect to tasks

### Medium Priority (P2)
14. `app/layout.tsx` - Fix font loading
15. `types/index.ts` - Remove unused NavItem
16. `app/(auth)/forgot-password/page.tsx` - Create new
17. Various navigation buttons - Add onClick handlers

### Low Priority (P3)
18. `app/(app)/notes/page.tsx` - Full implementation
19. `app/(app)/settings/page.tsx` - **COMPLETE REWRITE NEEDED**
20. `components/analytics/AnalyticsChart.tsx` - Real data
21. `components/analytics/HeatmapChart.tsx` - Real data
22. New: `components/ui/skeleton.tsx` - Loading states
23. New: `components/shared/ErrorBoundary.tsx` - Error handling
24. Add logout functionality to sidebar/settings

### Settings Module Files to Create (P1-P3)
25. `components/settings/ProfileSection.tsx` - Name, email, avatar
26. `components/settings/AppearanceSection.tsx` - Theme, colors
27. `components/settings/NotificationSection.tsx` - Email, push, reminders
28. `components/settings/AccountSection.tsx` - Password, export, delete
29. `components/settings/AppSettingsSection.tsx` - Language, time format
30. `app/globals.css` - Add dark theme color scheme
31. `services/user.service.ts` - Add settings methods
32. `types/index.ts` - Add UserSettings type, update User type
33. `hooks/use-settings.ts` - New hook for settings management
34. `components/theme-provider.tsx` - Theme context/provider
35. `components/ui/switch.tsx` - Toggle switches (shadcn add switch)
36. `components/ui/slider.tsx` - Sliders (shadcn add slider)

---

## Testing Checklist

### Critical (P0)
- [ ] Habit creation via QuickAddDialog works
- [ ] Task creation via QuickAddDialog works
- [ ] Habit toggle updates streak and persists
- [ ] Task status toggle persists
- [ ] Data persists after page refresh

### High (P1)
- [ ] Hooks are used in all pages
- [ ] Loading states work
- [ ] Error states handled gracefully
- [ ] Hardcoded values are dynamic
- [ ] MiniCalendar filters tasks by date

### Medium (P2)
- [ ] Build passes without errors
- [ ] ESLint shows no warnings
- [ ] Font loading optimized
- [ ] Task form in QuickAddDialog is complete
- [ ] Forgot password page exists

### Low (P3)
- [ ] Notes CRUD works
- [ ] Analytics charts show real data
- [ ] Search functionality works
- [ ] Notifications system works

### Settings Module Tests
- [ ] Profile name updates reflect across app (WelcomeHero, TopNavbar)
- [ ] Email update works with validation
- [ ] Avatar upload and preview works
- [ ] Theme toggle switches between light/dark/system
- [ ] Dark mode colors render correctly
- [ ] Theme preference persists after refresh
- [ ] Notification toggles save to settings
- [ ] Change password validates current password
- [ ] Export data downloads valid JSON/CSV
- [ ] Import data restores habits/tasks correctly
- [ ] Delete account shows confirmation dialog
- [ ] Delete account clears all data
- [ ] Logout clears session and redirects to login
- [ ] All settings persist after page refresh
- [ ] Settings sections are navigable on mobile
- [ ] Form validations show appropriate error messages
- [ ] Settings sidebar navigation works correctly
