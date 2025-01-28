import { Task } from 'src/task/domain/task';

export interface User {
    id: number;
    name: string;
    password: string;
    email: string;
    tasks: Task[];
}
