import * as Router from "koa-router";
import { Context } from "koa";
import { getManager } from "typeorm";
import { Article } from "../entity/Article";

export class ArticleController {

    public router: Router;
    private articleRepository;

    constructor() {

        this.router = new Router();
        this.articleRepository = getManager().getRepository(Article);

        this.router

            .get('/', async (ctx: Context) => {
                ctx.body = await this.articleRepository.find();
            })

            .get('/:id', async (ctx: Context) => {
                ctx.body = await this.articleRepository.findOne(
                    (ctx as any).params.id
                );
            })

            .post('/add', async (ctx: Context) => {
                const newArticle = this.articleRepository.create(ctx.request.body);
                ctx.body = await this.articleRepository.save(newArticle);

            })

    }

}