import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Note {

    @PrimaryColumn()
    gistId: string;

    @Column()
    description: string;

    @Column()
    subject: string;

    @Column({ default: false })
    readonly: boolean;

    @ManyToOne(type => User, author => author.notes)
    author: User;

    // @OneToMany(type => User, author => author.notes)
    // collector: User[];

}