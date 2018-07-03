import * as user from "./user";

// User Controller
export = function () {
    const Router = require('koa-router');
    const router = new Router();

    router.get('/', user.all);
    router.get('/:id', user.find);

    router.post('/add', user.add);

    return router;
}