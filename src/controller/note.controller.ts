import * as Router from "koa-router";
import { Context } from "koa";
import { getManager, Repository, Like } from "typeorm";
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

            .get("/public", async (ctx: Context) => {
                ctx.body = await this.note.find({
                    order: {
                        gistId: "ASC"
                    },
                }).catch(error => error);
            })

            .get("/search", async (ctx: Context) => {
                const keyword = ctx.request.query.keyword;
                ctx.body = await this.note.find({
                    where: {
                        description: Like(`%${keyword}%`)
                    }
                }).catch(error => error);
            })

            .get("/:id", async (ctx: Context) => {
                ctx.body = await this.GistService.getPage(ctx.id)
                    .catch(error => ctx.throw(404));
            })

            .get("/:id/information", async (ctx: Context) => {
                ctx.body = await this.note.findOneOrFail(ctx.id)
                    .catch(error => ctx.throw(404));
            })

            .get("/:id/content", async (ctx: Context) => {
                ctx.body = await this.GistService.getContent(ctx.id)
                    .catch(error => ctx.throw(404));
            })

            .patch("/:id", async (ctx: Context) => {
                const request = ctx.request.body;
                ctx.body = await this.GistService.modify(
                    ctx.id, request.description, request.files
                ).then(() => {
                    return this.note.update(ctx.id, {
                        description: request.description,
                        subject: request.subject
                    })
                }).catch(error => ctx.throw(404));
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

            // .put("/:id/star", async (ctx: Context) => {
            //     ctx.body = await this.GistService.star(ctx.id);
            // })

    }

}