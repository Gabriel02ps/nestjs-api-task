import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeorm } from '../entities/user.entity';
import { User } from 'src/user/domain/user';
import { UserRepository } from 'src/user/domain/user.repository';
import { UserCreateDto } from '../../dtos/user-create.dto';

@Injectable()
export class UserTypeormRepository implements UserRepository {
    constructor(
        @InjectRepository(UserTypeorm)
        private readonly userRepository: Repository<UserTypeorm>,
    ) {}
    async createNewUser(user: UserCreateDto): Promise<User> {
        const newUser = this.userRepository.create(user);

        console.log(newUser);
        return this.userRepository.save(newUser);
    }
    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }
    async changePassword(id: number, password: string): Promise<void> {
        const user = await this.getById(id);
        user.password = password;
        await this.userRepository.save(user);
    }
    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }
}
