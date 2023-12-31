import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Board } from '../board/board.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @BeforeInsert()
  usernameToLowerCase() {
    this.username = this.username.toLowerCase();
  }

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];
}
