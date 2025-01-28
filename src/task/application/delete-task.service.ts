import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../domain/task-repository';

@Injectable()
export class DeleteTaskService {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: TaskRepository,
    ) {}

    async execute(id: number, userId: number) {
        const task = await this.taskRepository.getTaskById(id);
        if (!task) {
            throw new Error('Task not found');
        }
        if (task.userId !== userId) {
            throw new Error('Task not found');
        }
        await this.taskRepository.deleteTask(id);
    }
}
