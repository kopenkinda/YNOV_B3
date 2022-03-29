import { HttpError } from "../HttpError.mjs";
import { sortByKey } from "../utils.mjs";
import { db } from "./match.db.mjs";
import { Match } from "./Match.entity.mjs";
import { extractFilters } from "./match.service.mjs";

export const getPaginatedMatches = async (req, res, _next) => {
  const filters = extractFilters(req);
  const filteredByTeam = db.filter((match) => {
    if (filters.team !== "") {
      return match.team1 === filters.team || match.team2 === filters.team;
    }
    return true;
  });
  const sortedMatches = sortByKey(filteredByTeam, filters.sort);
  const paginatedResults = sortedMatches.slice(
    filters.size * filters.page,
    filters.size * filters.page + filters.size
  );
  res.header("X-Total-Count", db.length);
  return res.json(paginatedResults);
};

export const getMatchesById = async (req, res, next) => {
  const match = db.find((m) => m.id === +req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  return res.json(match);
};

export const createMatch = async (req, res, _next) => {
  const { date, team1, score, team2 } = req.body;
  const match = new Match(date, team1, score, team2);
  db.push(match);
  return res.json(match);
};

export const updateWholeMatch = async (req, res, next) => {
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

export const updatePartialMatch = async (req, res, next) => {
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

export const deleteMatch = async (req, res, next) => {
  const match = db.find((m) => m.id === +req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  db.splice(db.indexOf(match), 1);
  return res.sendStatus(204);
};
