import { HttpError } from "./HttpError.mjs";

export const unsupportedMethod = (req, res, next) => {
  next(new HttpError("Method not supported", 405));
};
