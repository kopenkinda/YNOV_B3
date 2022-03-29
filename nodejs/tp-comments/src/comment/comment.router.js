import { Router } from 'express';
import { idCheckMiddleware } from '../common/id-check.middleware.js';
import { commentCheckMiddleware } from './comment.middleware.js';
import { commentController } from './comment.controller.js';
import { resourceMethodNotHandledMiddleware } from '../common/resource-not-handled.middleware.js';

export const commentRouter = Router();

commentRouter.get('/', commentController.findAll);
commentRouter.get('/:id', idCheckMiddleware(true), commentController.find);
commentRouter.post('/', commentCheckMiddleware(true), commentController.create);
commentRouter.patch('/:id', idCheckMiddleware(true), commentCheckMiddleware(false), commentController.patch);
commentRouter.put('/:id', idCheckMiddleware(true), commentCheckMiddleware(false), commentController.set);
commentRouter.delete('/:id', idCheckMiddleware(true), commentController.delete);
commentRouter.use(resourceMethodNotHandledMiddleware);
