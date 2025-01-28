import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/domain/task';
import { TaskRepository } from 'src/task/domain/task-repository';
import { Repository } from 'typeorm';
import { TaskTypeorm } from '../entities/task.entity';

export class TaskRepositoryTypeorm implements TaskRepository {
    constructor(
        @InjectRepository(TaskTypeorm)
        private readonly taskRepository: Repository<TaskTypeorm>,
    ) {}
    async createTask(task: Task): Promise<Task> {
        const newTask = this.taskRepository.create(task);
        return this.taskRepository.save(newTask);
    }
    async updateTask(task: Task): Promise<void> {
        await this.taskRepository.update(task.id, task);
    }
    async deleteTask(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
    async getTaskById(id: number): Promise<Task> {
        return this.taskRepository.findOne({ where: { id } });
    }
    async getAllTasks(
        userId: number,
        page: number,
        take: number,
    ): Promise<Task[]> {
        return this.taskRepository.find({
            where: { userId },
            skip: (page - 1) * take,
            take,
        });
    }
}
