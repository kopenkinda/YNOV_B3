import express from "express";
import matchRouter from "./match/match.router.mjs";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/match", matchRouter);

// * ==========================================
// * Error handling
// * ==========================================

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
