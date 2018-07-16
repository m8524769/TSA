import * as Router from "koa-router";
import { Context } from "koa";
import { getManager, Repository } from "typeorm";
import { Note } from "../entity/Note";
import { GistService } from "../service/gist.service";

export class NoteController {

    router: Router;
    private note: Repository<Note>;
    private GistService: GistService

    constructor() {

        this.note = getManager().getRepository(Note);
        this.GistService = new GistService();

        this.router = new Router()

            .param("id", (id: string, ctx: Context, next: Context): Context => {
                ctx.id = id;
                return next();
            })

            .post("/", async (ctx: Context) => {
                const request = ctx.request.body;
                ctx.body = await this.GistService.create(request.gist).then(response => {
                    return this.note.save(
                        this.note.create({
                            gistId: response,
                            description: request.gist.description,
                            subject: request.subject,
                            author: request.author,
                        })
                    )
                }).catch(error => error);
            })

            .get("/:id", async (ctx: Context) => {
                ctx.body = await this.GistService.get(ctx.id)
                    .catch(error => error);
            })

            // .put("/:id/star", async (ctx: Context) => {
            //     ctx.body = await this.GistService.star(ctx.id);
            // })

    }

}