import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    title: string;

    @Column()
    content: string;

    @Column({ default: false })
    approved: boolean;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(type => User, author => author.articles)
    author: User;

    // @ManyToMany(type => Tag, tag => tag.articles)
    // tags: Tag[];

}