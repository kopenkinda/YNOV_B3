import { DataTypes, Model } from "sequelize";
import { sequelize } from "../common/orm.config.js";

export class UserModel extends Model {}
UserModel.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("admin", "contributor", "guest"),
      defaultValue: "guest",
    },
  },
  { sequelize, modelName: "user" }
);
