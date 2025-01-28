import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ChangeUserPassword } from '../../application/change-password';
import { CreateUser } from '../../application/create-user';
import { GetByIdService } from '../../application/get-by-id';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private createUserService: CreateUser,
        private getByIdService: GetByIdService,
        private changePasswordService: ChangeUserPassword,
    ) {}

    @Post('create')
    async create(@Body() body) {
        return this.createUserService.execute(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async getById(@Param('id') id) {
        return this.getByIdService.execute(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/reset-password')
    async changePassword(@Body() body) {
        return this.changePasswordService.execute(body.id, body.newPassword);
    }
}
