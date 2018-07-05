import { UserController } from './controller/UserController';
import { ArticleController } from './controller/ArticleController';

export const AppRoutes = [
    {
        path: 'user',
        controller: UserController
    },
    {
        path: 'article',
        controller: ArticleController
    }
]