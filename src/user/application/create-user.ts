import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserCreateDto } from '../infra/dtos/user-create.dto';

@Injectable()
export class CreateUser {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) {}

    async execute(newUser: UserCreateDto) {
        const userExists = await this.userRepository.getByEmail(newUser.email);
        if (userExists) {
            throw new UnauthorizedException('User already exists');
        }

        return this.userRepository.createNewUser(newUser);
    }
}
