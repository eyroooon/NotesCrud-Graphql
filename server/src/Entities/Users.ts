import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notes } from "./Notes";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Notes, (notes) => notes.user)
  notes!: Notes[];
}
