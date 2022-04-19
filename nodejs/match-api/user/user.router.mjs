import { Router } from "express";
import { userController } from "./user.controller.mjs";
import { checkUserAuthDto } from "./user.middlewares.mjs";

export const userRouter = Router();

userRouter.post("/register", checkUserAuthDto, userController.register);
userRouter.post("/login", checkUserAuthDto, userController.login);
