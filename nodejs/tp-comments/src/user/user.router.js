import { Router } from "express";
import { userController } from "./user.controller.js";

export const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
