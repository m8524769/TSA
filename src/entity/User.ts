import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Article } from "./Article";
import { Note } from "./Note";
import { Knowledge } from "./Knowledge";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ length: 20 })
    nickname: string;

    @OneToMany(type => Article, article => article.author)
    articles: Article[];

    @OneToMany(type => Note, note => note.author)
    notes: Note[];

    @OneToMany(type => Knowledge, knowledge => knowledge.author)
    knowledge: Knowledge[];

    static getArticles(id: number) {
        return this.createQueryBuilder("user")
            .leftJoinAndSelect("user.articles", "article")
            .where("user.id = :id", { id })
            .getOne();
    }

}
