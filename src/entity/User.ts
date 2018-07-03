import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Article } from "../entity/Article";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ length: 20 })
    nickname: string;

    @OneToMany(type => Article, article => article.author)
    articles: Article[];

}