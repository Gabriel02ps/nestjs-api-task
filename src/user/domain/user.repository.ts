import { User } from '../domain/user';
import { UserCreateDto } from '../infra/dtos/user-create.dto';

export interface UserRepository {
    createNewUser(user: UserCreateDto): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getById(id: number): Promise<User>;
    changePassword(id: number, password: string): Promise<void>;
}
