import { ResourceNotFoundError } from "../common/repository-error.js";

let id = 0;
const items = [
  {
    id: ++id,
    rating: 5,
    content: "Awesome 👏👏👏",
  },
  {
    id: ++id,
    rating: 9,
    content: "Bad 👎👎👎",
  },
];

class CommentService {
  findAll = async () => items;

  findById = async (id) => {
    const itemToGet = items.find((item) => item.id === id);
    if (itemToGet) {
      return itemToGet;
    }
    throw new ResourceNotFoundError();
  };

  create = async (item) => {
    const itemToCreate = {
      id: ++id,
      rating: item.rating,
      content: item.content,
    };
    items.push(itemToCreate);
    return itemToCreate;
  };

  patch = async (id, item) => {
    const itemWithPatches = {
      id,
      ...(item.rating !== undefined && { rating: item.rating }),
      ...(item.content !== undefined && { content: item.content }),
    };
    const index = items.findIndex((comment) => comment.id === id);
    if (index < -1) {
      throw new ResourceNotFoundError();
    } else {
      const itemToUpdate = { ...items[index], ...itemWithPatches };
      items.splice(index, 1, itemToUpdate);
      return itemToUpdate;
    }
  };

  set = async (id, item) => {
    const commentToUpdate = {
      id,
      rating: item.rating,
      content: item.content,
    };
    const index = items.findIndex(
      (comment) => comment.id === commentToUpdate.id
    );
    if (index < -1) {
      throw new ResourceNotFoundError();
    } else {
      items.splice(index, 1, commentToUpdate);
      return commentToUpdate;
    }
  };

  delete = async (id) => {
    const index = items.findIndex((comment) => comment.id === id);
    if (index < -1) {
      throw new ResourceNotFoundError();
    } else {
      items.splice(index, 1);
    }
  };
}

export const commentService = new CommentService();
