import { Router } from "express";
import { commentRouter } from "./comment/comment.router.js";
import { resourceNotHandledMiddleware } from "./common/resource-not-handled.middleware.js";
import { userRouter } from "./user/user.router.js";

export const appRouter = Router();
appRouter.use("/auth", userRouter);
appRouter.use("/comments", commentRouter);
appRouter.use(resourceNotHandledMiddleware);
