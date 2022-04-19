import { generateToken } from "../common/auth.utils.js";
import { userService } from "./user.service.mjs";

export const userController = new (class {
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await userService.findByCreds(email, password);
      if (!user) {
        return next({ status: 401, message: "Bad credentials" });
      }
      const token = generateToken(user);
      return res.status(200).json({ token });
    } catch (e) {
      return next(e);
    }
  }
  async register(req, res, next) {
    const { email, password } = req.body;
    try {
      await userService.create(email, password);
      return res.status(204).send();
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        return next({ status: 400, message: "User already exists" });
      }
      return next(e);
    }
  }
})();
