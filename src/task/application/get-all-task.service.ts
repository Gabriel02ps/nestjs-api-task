import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../domain/task-repository';

@Injectable()
export class GetAllTaskService {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: TaskRepository,
    ) {}

    async execute(userId: number, page: number, take: number) {
        if (!page) page = 1;
        if (!take) take = 10;
        return await this.taskRepository.getAllTasks(userId, page, take);
    }
}
