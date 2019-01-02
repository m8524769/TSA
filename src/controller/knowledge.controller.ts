import * as Router from "koa-router";
import { Context } from "koa";
import { getManager, Repository } from "typeorm";
import { Knowledge } from "../entity/Knowledge";

export class KnowledgeController {

    router: Router;
    private knowledge: Repository<Knowledge>;

    constructor() {

        this.knowledge = getManager().getRepository(Knowledge);

        this.router = new Router()

            .param("id", (id: number, ctx: Context, next: Context): Context => {
                ctx.id = id;
                return next();
            })

            .get("/", async (ctx: Context) => {
                ctx.body = await this.knowledge.find({
                    order: {
                        created: "DESC",
                    },
                    skip: ctx.request.page * ctx.request.limit,
                    take: ctx.request.limit,
                });
            })

            .get("/:id", async (ctx: Context) => {
                ctx.body = await this.knowledge.findOneOrFail(ctx.id)
                    .catch(error => error);
            })

            .post("/", async (ctx: Context) => {
                ctx.body = await this.knowledge.save(
                    this.knowledge.create(ctx.request.body)
                ).catch(error => error);
            })

            .put("/:id", async (ctx: Context) => {
                ctx.body = await this.knowledge.update(
                    ctx.id,
                    ctx.request.body
                ).catch(error => error);
            })

            .delete("/:id", async (ctx: Context) => {
                ctx.body = await this.knowledge.delete(ctx.id)
                    .catch(error => error);
            })
    }

}
