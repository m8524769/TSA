import * as Router from "koa-router";
import { Context } from "koa";
import { getManager, Repository } from "typeorm";
import { Article } from "../entity/Article";

export class ArticleController {

    router: Router;
    private article: Repository<Article>;

    constructor() {

        this.article = getManager().getRepository(Article);

        this.router = new Router()

            .param("id", (id: number, ctx: Context, next: Context): Context => {
                ctx.id = id;
                return next();
            })

            .get("/", async (ctx: Context) => {
                ctx.body = await this.article.find();
            })

            .get("/:id", async (ctx: Context) => {
                ctx.body = await this.article.findOneOrFail(ctx.id)
                    .catch(error => error);
            })

            .post("/add", async (ctx: Context) => {
                ctx.body = await this.article.save(
                    this.article.create(ctx.request.body)
                ).catch(error => error);
            })

    }

}