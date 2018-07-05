import * as Router from "koa-router";
import { Context } from "koa";
import { getManager } from "typeorm";
import { User } from "../entity/User";

export class UserController {

    public router: Router;
    private userRepository;

    constructor() {

        this.router = new Router();
        this.userRepository = getManager().getRepository(User);

        this.router

            .get('/', async (ctx: Context) => {
                ctx.body = await this.userRepository.find();
            })

            .get('/:id', async (ctx: Context) => {
                ctx.body = await this.userRepository.findOne(
                    (ctx as any).params.id
                );
            })

            .post('/add', async (ctx: Context) => {
                const newUser = this.userRepository.create(ctx.request.body);
                ctx.body = await this.userRepository.save(newUser);
            })

    }

}