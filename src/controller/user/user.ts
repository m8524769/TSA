import { Context } from "koa";
import { getManager } from "typeorm";
import { User } from "../../entity/User";

// GET: Find all users
export async function all(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    ctx.body = users;
}

// GET: Find user
export async function find(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne((ctx as any).params.id);

    ctx.body = user;
}

// POET: Add user
export async function add(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const newUser = userRepository.create(ctx.request.body);
    await userRepository.save(newUser);

    ctx.body = newUser;
}