import { Module } from '@nestjs/common';
import { CreateTaskService } from './application/create-task.service';
import { UpdateTaskService } from './application/update-task.service';
import { DeleteTaskService } from './application/delete-task.service';
import { GetTaskByIdService } from './application/get-task-by-id.service';
import { GetAllTaskService } from './application/get-all-task.service';
import { TaskRepositoryTypeorm } from './infra/database/typeorm/repositories/task-repository';
import { TaskTypeorm } from './infra/database/typeorm/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './infra/controllers/task.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TaskTypeorm])],
    controllers: [TaskController],
    providers: [
        CreateTaskService,
        UpdateTaskService,
        DeleteTaskService,
        GetTaskByIdService,
        GetAllTaskService,
        {
            provide: 'TaskRepository',
            useClass: TaskRepositoryTypeorm,
        },
    ],
})
export class TaskModule {}
