import { UserController } from "./controller/user.controller";
import { AuthController } from "./controller/auth.controller";
import { ArticleController } from "./controller/article.controller";
import { NoteController } from "./controller/note.controller";
import { KnowledgeController } from "./controller/knowledge.controller";

export const AppRoutes = [
    {
        path: "user",
        controller: UserController,
    },
    {
        path: "auth",
        controller: AuthController,
    },
    {
        path: "article",
        controller: ArticleController,
    },
    {
        path: "note",
        controller: NoteController,
    },
    {
        path: "knowledge",
        controller: KnowledgeController,
    },
];
