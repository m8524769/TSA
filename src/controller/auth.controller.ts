import * as Router from "koa-router";
import * as passport from "koa-passport";
import { Context } from "koa";
import { getManager, Repository } from "typeorm";
import { User } from "../entity/User";

export class AuthController {

    router: Router;
    private user: Repository<User>;

    constructor() {

        this.user = getManager().getRepository(User);

        this.router = new Router()

            .get("/check", (ctx: Context) => {
                ctx.body = {
                    authenticated: ctx.isAuthenticated()
                };
            })

            .post("/login", (ctx: Context) => {
                return passport.authenticate('local', (error, user, info) => {
                    if (user) {
                        ctx.body = {
                            id: user.id,
                            nickname: user.nickname,
                        };
                        return ctx.login(user);
                    } else {
                        ctx.throw(401, info);
                    }
                })(ctx);
            })

            .post("/register", async (ctx: Context) => {
                ctx.body = await this.user.save(
                    this.user.create(ctx.request.body)
                ).catch(error => ctx.throw(409));
            })

            .get("/logout", async (ctx: Context) => {
                if (ctx.isAuthenticated()) {
                    await ctx.logout();
                    ctx.body = { success: true }
                } else {
                    ctx.throw(400, "You are not logged in yet.");
                }
            })

        // .get('/google', async (ctx: Context) => {
        //     passport.authenticate('google', {
        //         scope: ['https://www.googleapis.com/auth/plus.login']
        //     });
        // })

        // .get('/google/callback', async (ctx: Context) => {
        //     passport.authenticate('google', (req, res) => {
        //         res.redirect('/');
        //     });
        // })

    }

}
