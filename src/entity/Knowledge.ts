import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Knowledge {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, author => author.knowledge)
  author: User;

}
