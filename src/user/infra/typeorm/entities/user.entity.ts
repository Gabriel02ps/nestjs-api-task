import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { User } from '../../../../user/domain/user';
import { TaskTypeorm } from 'src/task/infra/database/typeorm/entities/task.entity';

@Entity('users')
export class UserTypeorm implements User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => TaskTypeorm, (task) => task.user)
    tasks: TaskTypeorm[];

    @BeforeInsert()
    hashPassword() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        this.password = hashSync(this.password, 10);
    }

    static from(user: User) {
        const userTypeorm = new UserTypeorm();
        userTypeorm.id = user.id;
        userTypeorm.name = user.name;
        userTypeorm.email = user.email;
        userTypeorm.password = user.password;
        return userTypeorm;
    }
}
