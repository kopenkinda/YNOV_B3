import { HttpError } from "../HttpError.mjs";
import luxon from "luxon";

export const verifyMatchDto = (req, res, next) => {
  const { date, team1, score, team2 } = req.body;
  const { method } = req;
  if (method === "PATCH") {
    if (date !== undefined && !luxon.DateTime.fromISO(date).isValid) {
      return next(new HttpError("Invalid date format", 400));
    }
    if (team1 !== undefined && !(typeof team1 === "string")) {
      return next(new HttpError("Team1 should be a string", 400));
    }
    if (team2 !== undefined && !(typeof team2 === "string")) {
      return next(new HttpError("Team2 should be a string", 400));
    }
    if (score !== undefined && !(Array.isArray(score) && score.length === 2)) {
      return next(new HttpError("Score should be an array of length 2", 400));
    }
    return next();
  }
  if (
    date === undefined ||
    team1 === undefined ||
    score === undefined ||
    team2 === undefined
  ) {
    return next(new HttpError("Bad request", 400));
  }
  if (date === "" || team1 === "" || score === "" || team2 === "") {
    return next(new HttpError("Fields cannot be empty", 400));
  }
  if (!luxon.DateTime.fromISO(date).isValid) {
    return next(new HttpError("Invalid date format", 400));
  }
  next();
};
