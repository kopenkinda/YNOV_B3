import luxon from "luxon";
import { ResourceNotFoundError } from "../common/repository-error.js";
import { CommentModel } from "./comment.model.js";

class CommentService {
  findAll = async () => {
    const comments = await CommentModel.findAll();
    return comments.map((comment) => ({
      ...comment.toJSON(),
      dateAgo: luxon.DateTime.fromJSDate(comment.date).diffNow().toObject(),
      dateAgo2: luxon.DateTime.fromJSDate(comment.date).toRelative(),
    }));
  };

  findById = async (id) => {
    const found = await CommentModel.findOne({ where: { id } });
    if (found != null) {
      return {
        ...found.toJSON(),
        dateAgo: luxon.DateTime.fromJSDate(found.date).diffNow().toObject(),
        dateAgo2: luxon.DateTime.fromJSDate(found.date).toRelative(),
      };
    }
    throw new ResourceNotFoundError();
  };

  create = async (item) => {
    const itemToCreate = {
      rating: item.rating,
      content: item.content,
    };
    const created = await CommentModel.create(itemToCreate);
    return created;
  };

  patch = async (id, item) => {
    const ensureRating = item.rating !== undefined && { rating: item.rating };
    const ensureContent = item.content !== undefined && {
      content: item.content,
    };
    const itemWithPatches = {
      id,
      ...ensureRating,
      ...ensureContent,
    };
    const found = await CommentModel.findOne({ id });
    if (found == null) {
      throw new ResourceNotFoundError();
    } else {
      Object.keys(itemWithPatches).forEach((key) => {
        found[key] = itemWithPatches[key];
      });
      const saved = await found.save();
      return saved;
    }
  };

  set = async (id, item) => {
    const commentToUpdate = {
      id,
      rating: item.rating,
      content: item.content,
    };

    const found = await CommentModel.findOne({ id });
    if (found == null) {
      throw new ResourceNotFoundError();
    } else {
      Object.keys(commentToUpdate).forEach((key) => {
        found[key] = commentToUpdate[key];
      });
      const saved = await found.save();
      return saved;
    }
  };

  delete = async (id) => {
    const found = await CommentModel.findOne({ where: { id } });
    if (found == null) {
      throw new ResourceNotFoundError();
    } else {
      await found.destroy();
    }
  };
}

export const commentService = new CommentService();
