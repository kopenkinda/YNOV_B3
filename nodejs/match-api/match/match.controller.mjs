import { extractFilters } from "./match.service.mjs";
import { sortByKey } from "../utils.mjs";
import { db } from "./match.db.mjs";

export const getPaginatedMatches = (req, res, _next) => {
  const filters = extractFilters(req);
  const paginatedResults = sortByKey(db, filters.sort).slice(
    filters.size * filters.page,
    filters.size * filters.page + filters.size
  );
  const sortedResults = paginatedResults;
  res.header("X-Total-Count", db.length);
  return res.json(sortedResults);
};

export const getMatchesById = (req, res, next) => {
  const match = db.find((m) => m.id === +req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  return res.json(match);
};

export const createMatch = (req, res, _next) => {
  const { date, team1, score, team2 } = req.body;
  const match = new Match(date, team1, score, team2);
  db.push(match);
  return res.json(match);
};

export const updateWholeMatch = (req, res, next) => {
  const match = db.find((m) => m.id === +req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  const { date, team1, score, team2 } = req.body;
  match.date = date;
  match.team1 = team1;
  match.score = score;
  match.team2 = team2;
  return res.json(match);
};

export const updatePartialMatch = (req, res, next) => {
  const match = db.find((m) => m.id === +req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  const { date, team1, score, team2 } = req.body;
  match.date = date ?? match.date;
  match.team1 = team1 ?? match.team1;
  match.score = score ?? match.score;
  match.team2 = team2 ?? match.team2;
  return res.json(match);
};

export const deleteMatch = (req, res, next) => {
  const match = db.find((m) => m.id === +req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  db.splice(db.indexOf(match), 1);
  return res.sendStatus(204);
};
