export const commentCheckMiddleware = exhaustiveMode => (request, response, next) => {
  const comment = request.body;
  const errors = [];
  if (exhaustiveMode) {
    if (!comment.rating) {
      errors.push('rating is missing');
    }
    if (!comment.content) {
      errors.push('content is missing');
    }
  }
  if (comment.rating || exhaustiveMode) {
    if (!Number.isInteger(parseInt(comment.rating))) {
      errors.push('rating must be an integer');
    }
    if (!(comment.rating >= 0)) {
      errors.push('rating must be higher than or equal to 0');
    }
    if (!(comment.rating <= 5)) {
      errors.push('rating must be lower than or equal to 5');
    }
  }
  if (comment.content || exhaustiveMode) {
    if (!(typeof comment.content === 'string')) {
      errors.push('content must be a string');
    }
    if (!(comment.content?.length >= 2)) {
      errors.push('content length must be higher or equal to 2');
    }
  }
  if (errors.length) {
    next({ code: 400, details: `Body has the following errors: ${errors.join(', ')}` });
  } else {
    next();
  }
};
