import { Router } from 'express';
import { commentRouter } from './comment/comment.router.js';
import { resourceNotHandledMiddleware } from './common/resource-not-handled.middleware.js';

export const appRouter = Router();
appRouter.use('/comments', commentRouter);
appRouter.use(resourceNotHandledMiddleware);
