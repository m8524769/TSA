import * as Router from "koa-router";
import * as passport from "koa-passport";
import { Context } from "koa";
import { getManager, Repository } from "typeorm";
import { User } from "../entity/User";

export class UserController {

    router: Router;
    private user: Repository<User>;

    constructor() {

        this.user = getManager().getRepository(User);

        this.router = new Router()

            .param("id", (id: number, ctx: Context, next: Context): Context => {
                ctx.id = id;
                return next();
            })

            .get("/", async (ctx: Context) => {
                ctx.body = await this.user.find({
                    select: ["email", "nickname"]
                });
            })

            .get("/:id", async (ctx: Context) => {
                if (ctx.isAuthenticated() && ctx.id == ctx.session.passport.user) {
                    ctx.body = ctx.state.user;
                } else {
                    ctx.throw(401);
                }
            })

            .get("/:id/articles", async (ctx: Context) => {
                ctx.body = await this.user.findOneOrFail(ctx.id, {
                    relations: ["articles"],
                }).then(user => user.articles)
                    .catch(error => ctx.throw(404));
            })

            .get("/:id/notes", async (ctx: Context) => {
                ctx.body = await this.user.findOneOrFail(ctx.id, {
                    relations: ["notes"],
                }).then(user => user.notes)
                    .catch(error => ctx.throw(404));
            })

            .get("/:id/knowledge", async (ctx: Context) => {
                ctx.body = await this.user.findOneOrFail(ctx.id, {
                    relations: ["knowledge"],
                }).then(user => user.knowledge)
                    .catch(error => ctx.throw(404));
            })

            // .post("/login", async (ctx: Context) => {
            //     ctx.body = await this.user.findOneOrFail({
            //         where: {
            //             email: ctx.request.body.email,
            //             password: ctx.request.body.password
            //         }
            //     }).then(() => true)
            //         .catch(error => ctx.throw(401));
            // })

            // .post("/register", async (ctx: Context) => {
            //     ctx.body = await this.user.save(
            //         this.user.create(ctx.request.body)
            //     ).catch(error => ctx.throw(409));
            // })

    }

}
