import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../domain/task-repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '../domain/task';

@Injectable()
export class CreateTaskService {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: TaskRepository,
    ) {}

    async execute(task: CreateTaskDto, userId: number) {
        let newTask: Task = { ...task, status: 'Pendente', userId };
        newTask = await this.taskRepository.createTask(newTask);
        return newTask;
    }
}
