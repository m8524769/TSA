import { Context } from "koa";
import { getManager } from "typeorm";
import { Article } from "../../entity/Article";

// GET: Find all articles
export async function all(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const articles = await articleRepository.find();

    ctx.body = articles;
}

// GET: Find article
export async function find(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const article = await articleRepository.findOne((ctx as any).params.id);

    ctx.body = article;
}

// POET: Add article
export async function add(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const newArticle = articleRepository.create(ctx.request.body);
    await articleRepository.save(newArticle);

    ctx.body = newArticle
}