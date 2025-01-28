import { Task } from 'src/task/domain/task';
import { UserTypeorm } from 'src/user/infra/typeorm/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class TaskTypeorm implements Task {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @CreateDateColumn()
    createdAt: Date;
    @Column()
    status: string;
    @Column()
    userId: number;

    @ManyToOne(() => UserTypeorm, (user) => user.tasks)
    user: UserTypeorm;
}
