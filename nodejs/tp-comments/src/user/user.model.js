import { DataTypes, Model } from "sequelize";
import { sequelize } from "../common/orm.config.js";

export class UserModel extends Model {}
UserModel.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);
