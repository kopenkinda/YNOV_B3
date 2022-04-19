import { Op } from "sequelize";
import { HttpError } from "../HttpError.mjs";
import { sortByKey } from "../utils.mjs";
import { MatchModel } from "./match.model.js";
import { extractFilters } from "./match.utils.mjs";

export const getPaginatedMatches = async (req, res, _next) => {
  const filters = extractFilters(req);
  const count = await MatchModel.count();
  let filteredByTeam = [];
  if (filters.team) {
    filteredByTeam = await MatchModel.findAll({
      where: {
        [Op.or]: [
          {
            team1: filters.team,
          },
          {
            team2: filters.team,
          },
        ],
      },
      limit: filters.size,
      offset: filters.page * filters.size,
    });
  } else {
    filteredByTeam = await MatchModel.findAll({
      limit: filters.size,
      offset: filters.page * filters.size,
    });
  }
  const sortedMatches = sortByKey(filteredByTeam, filters.sort);
  res.header("X-Total-Count", count);
  return res.json(sortedMatches);
};

export const getMatchesById = async (req, res, next) => {
  const match = await MatchModel.findByPk(req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  return res.json(match);
};

export const createMatch = async (req, res, _next) => {
  const { date, team1, score, team2 } = req.body;
  const match = await MatchModel.create({
    date,
    team1,
    score: score.join("|"),
    team2,
  });
  match.score = score;
  return res.json(match);
};

export const updateWholeMatch = async (req, res, next) => {
  const match = await MatchModel.findByPk(req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  const { date, team1, score, team2 } = req.body;
  match.date = date;
  match.team1 = team1;
  match.score = score.join("|");
  match.team2 = team2;
  await match.save();
  match.score = score;
  return res.json(match);
};

export const updatePartialMatch = async (req, res, next) => {
  const match = await MatchModel.findByPk(req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  const { date, team1, score, team2 } = req.body;
  match.date = date ?? match.date;
  match.team1 = team1 ?? match.team1;
  match.score = score?.join("|") ?? match.score.join("|");
  match.team2 = team2 ?? match.team2;
  await match.save();
  match.score = match.score.split("|");
  return res.json(match);
};

export const deleteMatch = async (req, res, next) => {
  const match = await MatchModel.findByPk(req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  await match.destroy();
  return res.sendStatus(204);
};
