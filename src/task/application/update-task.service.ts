import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core';
import { TaskRepository } from '../domain/task-repository';

@Injectable()
export class UpdateTaskService {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: TaskRepository,
    ) {}

    async execute(task: any, userId: number) {
        const taskToUpdate = await this.taskRepository.getTaskById(task.id);
        console.log(taskToUpdate);
        if (taskToUpdate.userId !== userId) {
            throw new Error('Task not found');
        }
        await this.taskRepository.updateTask(task);
        return this.taskRepository.getTaskById(task.id);
    }
}
