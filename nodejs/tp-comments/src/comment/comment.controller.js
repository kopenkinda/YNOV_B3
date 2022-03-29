import { commentService } from './comment.service.js';
import { ResourceNotFoundError } from '../common/repository-error.js';

class CommentController {
  findAll = (request, response) => {
    const items = commentService.findAll();
    response.header('x-total-count', `${items.length}`);
    response.json(items);
  };

  find = (request, response, next) => {
    const id = request.params.id;
    try {
      const item = commentService.findById(id);
      response.json(item);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        next({ code: 404, details: `Resource with id=${id} does not exist` });
      } else {
        next(error);
      }
    }
  };

  create = (request, response) => {
    const item = commentService.create(request.body);
    response.status(201);
    response.json(item);
  };

  patch = (request, response, next) => {
    const id = request.params.id;
    try {
      const item = commentService.patch(id, request.body);
      response.json(item);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        next({ code: 404, details: `Resource with id=${id} does not exist` });
      } else {
        next(error);
      }
    }
  };

  set = (request, response, next) => {
    const id = request.params.id;
    try {
      const item = commentService.set(id, request.body);
      response.json(item);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        next({ code: 404, details: `Resource with id=${id} does not exist` });
      } else {
        next(error);
      }
    }
  };

  delete = (request, response, next) => {
    const id = request.params.id;
    try {
      commentService.delete(id);
      response.status(204);
      response.json();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        next({ code: 404, details: `Resource with id=${id} does not exist` });
      } else {
        next(error);
      }
    }
  };
}

export const commentController = new CommentController();
