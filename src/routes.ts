import { UserController } from "./controller/user.controller";
import { ArticleController } from "./controller/article.controller";

export const AppRoutes = [
    {
        path: "user",
        controller: UserController,
    },
    {
        path: "article",
        controller: ArticleController,
    },
];
