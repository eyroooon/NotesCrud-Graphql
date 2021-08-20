import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Notes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column()
  timestamp!: string;

  @ManyToOne(() => Users, (user) => user.notes)
  user!: Users;
}
