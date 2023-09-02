import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ name: 'boards' })
export class Board {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @ManyToOne(() => User, user => user.boards)
  @JoinColumn({ name: 'user_id' })
    user: User;
}
