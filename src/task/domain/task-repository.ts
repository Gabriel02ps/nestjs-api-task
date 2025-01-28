import { Task } from './task';

export interface TaskRepository {
    createTask(task: Task): Promise<Task>;
    updateTask(task: Task): Promise<void>;
    deleteTask(id: number): Promise<void>;
    getTaskById(id: number): Promise<Task>;
    getAllTasks(userId: number, page: number, take: number): Promise<Task[]>;
}
