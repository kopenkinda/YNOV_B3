import { ResourceNotFoundError } from "../common/repository-error.js";
import { commentService } from "./comment.service.js";

class CommentController {
  findAll = async (request, response) => {
    const items = await commentService.findAll();
    response.header("x-total-count", `${items.length}`);
    response.json(items);
  };

  find = async (request, response, next) => {
    const id = request.params.id;
    try {
      const item = await commentService.findById(id);
      response.json(item);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        next({ code: 404, details: `Resource with id=${id} does not exist` });
      } else {
        next(error);
      }
    }
  };

  create = async (request, response) => {
    const item = await commentService.create(request.body);
    response.status(201);
    response.json(item);
  };

  patch = async (request, response, next) => {
    const id = request.params.id;
    try {
      const item = await commentService.patch(id, request.body);
      response.json(item);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        next({ code: 404, details: `Resource with id=${id} does not exist` });
      } else {
        next(error);
      }
    }
  };

  set = async (request, response, next) => {
    const id = request.params.id;
    try {
      const item = await commentService.set(id, request.body);
      response.json(item);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        next({ code: 404, details: `Resource with id=${id} does not exist` });
      } else {
        next(error);
      }
    }
  };

  delete = async (request, response, next) => {
    const id = request.params.id;
    try {
      await commentService.delete(id);
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
