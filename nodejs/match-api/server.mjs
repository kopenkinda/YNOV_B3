import express from "express";
import { errorMiddleware } from "./common/error.middleware.js";
import "./common/orm.config.js";
import matchRouter from "./match/match.router.mjs";
import { userRouter } from "./user/user.router.mjs";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/matches", matchRouter);
app.use("/users", userRouter);

// * ==========================================
// * Error handling
// * ==========================================

app.use((_req, _res, next) => {
  next({ status: 404, message: "Not found" });
});
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
