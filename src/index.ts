import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as serve from "koa-static";
import * as session from "koa-session";
import * as bodyParser from "koa-bodyparser";

createConnection().then(async connection => {

    // Setup and run Koa
    const app = new Koa();

    // Body Parser
    app.use(bodyParser({
        enableTypes: ['json', 'form']
    }));

    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });

    // Router: Use /api/<routerName> to connect back-end
    const router = new Router();
    const fs = require('fs');

    let controllers = fs.readdirSync(`${__dirname}/controller`);
    controllers.forEach(name => {
        let eachRouter = require(`./controller/${name}`)();
        router.use(`/api/${name}`, eachRouter.routes(), eachRouter.allowedMethods());
        console.log(`Controller ${name}: \tLoaded`);
    })
    app.use(router.routes()).use(router.allowedMethods());

    // Static file serving
    app.use(serve(`${__dirname}/static`));

    // Session
    app.use(session(app));

    app.listen(3000, () => {
        console.log('Server listening on port 3000.');
    });

}).catch(error => console.log(error));