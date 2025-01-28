import { Controller, Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core';
import {
    Body,
    Delete,
    Param,
    Query,
    Req,
    Request,
} from '@nestjs/common/decorators/http';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskService } from 'src/task/application/create-task.service';
import { DeleteTaskService } from 'src/task/application/delete-task.service';
import { CreateTaskDto } from 'src/task/application/dto/create-task.dto';
import { GetAllTaskService } from 'src/task/application/get-all-task.service';
import { UpdateTaskService } from 'src/task/application/update-task.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('task')
@Controller('task')
export class TaskController {
    constructor(
        private getAllTaskService: GetAllTaskService,
        private createTaskService: CreateTaskService,
        private updateTaskService: UpdateTaskService,
        private deleteTaskService: DeleteTaskService,
    ) {}

    @Get('all')
    async getAllTasks(
        @Request() req,
        @Query('page') page,
        @Query('take') take,
    ) {
        return await this.getAllTaskService.execute(req.user.id, page, take);
    }

    @Post('create')
    async createTask(@Body() body: CreateTaskDto, @Request() req) {
        return await this.createTaskService.execute(body, req.user.id);
    }

    @Post('update/:id')
    async updateTask(@Body() body, @Param('id') id: number, @Request() req) {
        return await this.updateTaskService.execute(
            { ...body, id, userId: req.user.id },
            req.user.id,
        );
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number, @Request() req) {
        await this.deleteTaskService.execute(id, req.user.id);
    }
}
