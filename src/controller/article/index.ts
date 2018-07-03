import * as article from "./article";

// Article Controller
export = function () {
    const Router = require('koa-router');
    const router = new Router();

    router.get('/', article.all);
    router.get('/:id', article.find);

    router.post('/add', article.add);

    return router;
}