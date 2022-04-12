import jsonwebtoken from "jsonwebtoken";
import { ResourceNotFoundError } from "../common/repository-error.js";
import { userService } from "./user.service.js";

export const userController = new (class {
  login = async (req, res, next) => {
    try {
      const user = await userService.findByCreds(
        req.body.email,
        req.body.password
      );
      const loggedInDto = { id: user.id, email: user.email };
      const token = jsonwebtoken.sign(loggedInDto, process.env.JWT_SECRET);
      res.json({ user: loggedInDto, token });
    } catch (e) {
      if (e instanceof ResourceNotFoundError) {
        return res.status(401).send({ message: "Bad credentials" });
      }
      next(e);
    }
  };

  register = async (req, res, next) => {
    try {
      const user = await userService.create(req.body.email, req.body.password);
      const loggedInDto = { id: user.id, email: user.email };
      const token = jsonwebtoken.sign(loggedInDto, process.env.JWT_SECRET);
      res.json({ user: loggedInDto, token });
    } catch (e) {
      if (e?.message === "User already exists") {
        return next({ code: 409, message: "User already exists" });
      }
      next(e);
    }
  };
})();
