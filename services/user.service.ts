import type { User } from "@/types";
import { mockUser } from "@/lib/mock-data";

// Simulated API delay
const DELAY = 200;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface UpdateUserInput {
    name?: string;
    firstName?: string;
    email?: string;
    avatar?: string;
}

class UserService {
    private user: User = { ...mockUser };

    async getCurrentUser(): Promise<User> {
        await delay(DELAY);
        return { ...this.user };
    }

    async update(input: UpdateUserInput): Promise<User> {
        await delay(DELAY);
        this.user = { ...this.user, ...input };
        return { ...this.user };
    }

    async updateAvatar(avatarUrl: string): Promise<User> {
        await delay(DELAY);
        this.user.avatar = avatarUrl;
        return { ...this.user };
    }
}

export const userService = new UserService();
