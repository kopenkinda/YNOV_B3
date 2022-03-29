import { DataTypes, Model } from "sequelize";
import { sequelize } from "../common/orm.config.js";

export class CommentModel extends Model {}
CommentModel.init(
  {
    rating: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  },
  { sequelize, modelName: "comment" }
);
