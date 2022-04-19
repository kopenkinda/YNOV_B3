import { DataTypes, Model } from "sequelize";
import { sequelize } from "../common/orm.config.js";

export class MatchModel extends Model {}
MatchModel.init(
  {
    team1: DataTypes.STRING,
    team2: DataTypes.STRING,
    score: DataTypes.STRING,
    date: DataTypes.DATE,
  },
  { sequelize, modelName: "match" }
);

MatchModel.addHook("afterFind", (matches) => {
  if (Array.isArray(matches)) {
    matches.forEach((match) => {
      match.score = match.score.split("|");
    });
  } else if (matches !== null) {
    matches.score = matches.score.split("|");
  }
});
