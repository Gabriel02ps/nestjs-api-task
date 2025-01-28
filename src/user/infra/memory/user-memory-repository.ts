import { resolve } from 'path';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';

export class UserMemoryRepository implements UserRepository {
    private users: User[] = [];

    constructor() {
        this.users = [];
    }
    async createNewUser(user: User): Promise<User> {
        return new Promise((resolve) => {
            this.users.push(user);
            resolve(user);
        });
    }
    async getByEmail(email: string): Promise<User> {
        return new Promise((resolve) => {
            resolve(this.users.find((u) => u.email === email));
        });
    }
    async getById(id: number): Promise<User> {
        return new Promise((resolve) => {
            resolve(this.users.find((u) => u.id === id));
        });
    }
    async changePassword(id: number, password: string): Promise<void> {
        const user = await this.getById(id);
        user.password = password;
    }
}
