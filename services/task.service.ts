import type { Task, TaskStatus, TaskPriority } from "@/types";
import { mockTasks } from "@/lib/mock-data";

// Simulated API delay
const DELAY = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CreateTaskInput {
    title: string;
    time?: string;
    date: string;
    priority: TaskPriority;
    color: string;
    tags?: string[];
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
    status?: TaskStatus;
}

class TaskService {
    private tasks: Task[] = [...mockTasks];

    async getAll(): Promise<Task[]> {
        await delay(DELAY);
        return [...this.tasks];
    }

    async getById(id: string): Promise<Task | null> {
        await delay(DELAY);
        return this.tasks.find((t) => t.id === id) ?? null;
    }

    async getByDate(date: string): Promise<Task[]> {
        await delay(DELAY);
        return this.tasks.filter((t) => t.date === date);
    }

    async getTodayTasks(): Promise<Task[]> {
        await delay(DELAY);
        const today = new Date().toISOString().split("T")[0];
        return this.tasks.filter((t) => t.date === today);
    }

    async getByStatus(status: TaskStatus): Promise<Task[]> {
        await delay(DELAY);
        return this.tasks.filter((t) => t.status === status);
    }

    async getByPriority(priority: TaskPriority): Promise<Task[]> {
        await delay(DELAY);
        return this.tasks.filter((t) => t.priority === priority);
    }

    async create(input: CreateTaskInput): Promise<Task> {
        await delay(DELAY);
        const newTask: Task = {
            id: `t${Date.now()}`,
            ...input,
            status: "pending",
        };
        this.tasks.push(newTask);
        return newTask;
    }

    async update(id: string, input: UpdateTaskInput): Promise<Task | null> {
        await delay(DELAY);
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index === -1) return null;
        
        this.tasks[index] = { ...this.tasks[index], ...input };
        return this.tasks[index];
    }

    async delete(id: string): Promise<boolean> {
        await delay(DELAY);
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index === -1) return false;
        
        this.tasks.splice(index, 1);
        return true;
    }

    async toggleStatus(id: string): Promise<Task | null> {
        await delay(DELAY);
        const task = this.tasks.find((t) => t.id === id);
        if (!task) return null;
        
        const statusOrder: TaskStatus[] = ["pending", "in-progress", "done"];
        const currentIndex = statusOrder.indexOf(task.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        task.status = statusOrder[nextIndex];
        
        return task;
    }
}

export const taskService = new TaskService();
