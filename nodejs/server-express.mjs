import express from "express";
import luxon from "luxon";
import { birthdayDaysWithPhase } from "./fns-lunar.mjs";

const app = express();

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const verifyParams = (req, res, next) => {
  const { city, dateFrom } = req.query;
  if (city === undefined || dateFrom === undefined) {
    return next(new HttpError("Bad request", 400));
  }
  if (city === "" || dateFrom === "") {
    return next(new HttpError("Fields cannot be empty", 400));
  }
  if (!luxon.DateTime.fromISO(dateFrom).isValid) {
    return next(new HttpError("Invalid date format", 400));
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status ?? 500).json({ error: err.message });
};

app.get("/bdays", verifyParams, async (req, res) => {
  const { city, dateFrom } = req.query;
  return res.json(await birthdayDaysWithPhase(dateFrom, city));
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on: http://localhost:3000");
});
