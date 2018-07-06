import * as Router from "koa-router";
import { Context } from "koa";
import { getManager, Repository } from "typeorm";
import { User } from "../entity/User";

export class UserController {

    public router: Router;
    private user: Repository<User>;

    constructor() {

        this.user = getManager().getRepository(User);

        this.router = new Router()

            .param("id", (id: number, ctx: Context, next: Context): Context => {
                ctx.id = id;
                return next();
            })

            .get("/", async (ctx: Context) => {
                ctx.body = await this.user.find();
            })

            .get("/:id", async (ctx: Context) => {
                ctx.body = await this.user.findOneOrFail(ctx.id)
                    .catch(error => error);
            })

            .get("/:id/articles", async (ctx: Context) => {
                ctx.body = await this.user.findOneOrFail({
                    where: {
                        id: ctx.id
                    },
                    relations: ["articles"],
                }).then(user => user.articles)
                    .catch(error => error);
            })

            .post("/add", async (ctx: Context) => {
                ctx.body = await this.user.save(
                    this.user.create(ctx.request.body)
                ).catch(error => error);
            })

    }

}