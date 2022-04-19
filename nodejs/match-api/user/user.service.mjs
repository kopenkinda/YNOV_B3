import crypto from "crypto";
import { UserModel } from "./user.model.mjs";

export const userService = new (class {
  getByEmail(email) {
    return UserModel.findOne({ where: { email } });
  }

  create(email, password) {
    return UserModel.create({
      email,
      password: this.#getHashedPassword(password),
    });
  }

  findByCreds(email, password) {
    return UserModel.findOne({
      where: { email, password: this.#getHashedPassword(password) },
    });
  }

  #getHashedPassword(password) {
    return crypto
      .createHash("sha256")
      .update(password + process.env.PASSWORD_PEPPER)
      .digest("hex");
  }
})();
