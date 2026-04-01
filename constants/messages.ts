export const ERROR_MESSAGES = {
    GENERIC: "Something went wrong. Please try again.",
    UNAUTHORIZED: "You must be logged in to access this page.",
    NOT_FOUND: "The requested resource was not found.",
    VALIDATION: "Please check your input and try again.",
    NETWORK: "Network error. Please check your connection.",
} as const;

export const SUCCESS_MESSAGES = {
    HABIT_CREATED: "Habit created successfully!",
    HABIT_UPDATED: "Habit updated successfully!",
    HABIT_DELETED: "Habit deleted successfully!",
    TASK_CREATED: "Task created successfully!",
    TASK_UPDATED: "Task updated successfully!",
    TASK_DELETED: "Task deleted successfully!",
    SETTINGS_SAVED: "Settings saved successfully!",
} as const;

export const GREETINGS = {
    MORNING: "Good morning",
    AFTERNOON: "Good afternoon",
    EVENING: "Good evening",
} as const;
