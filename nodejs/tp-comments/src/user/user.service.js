import crypto from "crypto";
import { ResourceNotFoundError } from "../common/repository-error.js";
import { UserModel } from "./user.model.js";

export const userService = new (class {
  findByCreds = async (email, password) => {
    const found = await UserModel.findOne({ where: { email } });
    if (found == null) {
      throw new ResourceNotFoundError();
    }
    const hashedPass = this.getHashedPassword(password);
    if (found.password != hashedPass) {
      throw new Error();
    }
    return found;
  };

  create = async (email, password) => {
    const found = await UserModel.findOne({ where: { email } });
    if (found != null) {
      throw new Error("User already exists");
    }

    const hashedPass = this.getHashedPassword(password);
    const user = await UserModel.create({ email, password: hashedPass });
    return user;
  };

  getHashedPassword = (password) => {
    return crypto
      .createHash("sha256")
      .update(password + process.env.PASSWORD_PEPPER)
      .digest("hex");
  };
})();
