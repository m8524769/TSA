import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as serve from "koa-static";
import * as session from "koa-session";
import * as bodyParser from "koa-bodyparser";
import { AppRoutes } from "./routes";

createConnection().then(async connection => {

    // Setup and run Koa
    const app = new Koa();

    // Body Parser
    app.use(bodyParser({
        enableTypes: ["json", "form"],
    }));

    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });

    // Router: Use /api/<routerName> to connect back-end
    const router = new Router();

    AppRoutes.forEach(route => {
        const controller = new route.controller();
        router.use(`/api/${route.path}`,
            controller.router.routes(),
            controller.router.allowedMethods()
        );
        console.log(`${route.path.toUpperCase()} Controller: \tLoaded`);
    });
    app.use(router.routes()).use(router.allowedMethods());

    // Static file serving
    app.use(serve(`${__dirname}/static`));

    // Session
    app.use(session(app));

    const port = 3000;
    app.listen(port, () => {
        console.log(`Server listening on localhost:${port}.`);
    });

}).catch(error => console.error(error));
