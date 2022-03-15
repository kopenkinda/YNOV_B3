import express from "express";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

class Match {
  static id = 0;
  constructor(date, homeTeam, score, visitorTeam) {
    this.date = date;
    this.homeTeam = homeTeam;
    this.score = score;
    this.visitorTeam = visitorTeam;
    this.id = Match.id++;
  }
}

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const db = [
  new Match(new Date(Date.now() - 10000), "Robin", [1, 1], "Borussia"),
  new Match(new Date(Date.now() - 20000), "Robin", [2, 1], "Corussia"),
  new Match(new Date(Date.now() - 30000), "Robin", [3, 1], "Dorussia"),
  new Match(new Date(Date.now() - 40000), "Robin", [4, 1], "Eorussia"),
  new Match(new Date(Date.now() - 50000), "Robin", [5, 1], "Forussia"),
  new Match(new Date(Date.now() - 10000), "Robin", [1, 1], "Borussia"),
  new Match(new Date(Date.now() - 20000), "Robin", [2, 1], "Corussia"),
  new Match(new Date(Date.now() - 30000), "Robin", [3, 1], "Dorussia"),
  new Match(new Date(Date.now() - 40000), "Robin", [4, 1], "Eorussia"),
  new Match(new Date(Date.now() - 50000), "Robin", [5, 1], "Forussia"),
  new Match(new Date(Date.now() - 10000), "Robin", [1, 1], "Borussia"),
  new Match(new Date(Date.now() - 20000), "Robin", [2, 1], "Corussia"),
  new Match(new Date(Date.now() - 30000), "Robin", [3, 1], "Dorussia"),
  new Match(new Date(Date.now() - 40000), "Robin", [4, 1], "Eorussia"),
  new Match(new Date(Date.now() - 50000), "Robin", [5, 1], "Forussia"),
];

const extractFilters = (req) => {
  const { sort, page, size } = req.query;
  const filters = {};
  if (sort) {
    filters.sort = sort;
  }
  if (!filters.sort) {
    filters.sort = "date";
  }
  if (page && !Number.isNaN(page)) {
    filters.page = +page > 1 ? +page - 1 : 0;
  }
  if (!filters.page) {
    filters.page = 0;
  }
  if (size && !Number.isNaN(size)) {
    filters.size = +size > 50 ? 50 : +size < 5 ? 5 : +size;
  }
  if (!filters.size) {
    filters.size = 10;
  }
  return filters;
};

const verifyMatchDto = (req, res, next) => {
  const { date, homeTeam, score, visitorTeam } = req.body;
  if (
    date === undefined ||
    homeTeam === undefined ||
    score === undefined ||
    visitorTeam === undefined
  ) {
    return next(new HttpError("Bad request", 400));
  }
  if (date === "" || homeTeam === "" || score === "" || visitorTeam === "") {
    return next(new HttpError("Fields cannot be empty", 400));
  }
  if (!luxon.DateTime.fromISO(date).isValid) {
    return next(new HttpError("Invalid date format", 400));
  }
  next();
};

const sortByKey = (array, k) => {
  if (k.startsWith("-")) {
    return array.sort((a, b) => b[k.slice(1)] - a[k.slice(1)]);
  }
  return array.sort((a, b) => a[k] - b[k]);
};

app.get("/matches", (req, res, next) => {
  const filters = extractFilters(req);
  const paginatedResults = sortByKey(db, filters.sort).slice(
    filters.size * filters.page,
    filters.size * filters.page + filters.size
  );
  const sortedResults = paginatedResults;
  res.header("X-Total-Count", db.length);
  return res.json(sortedResults);
});

app.get("/matches/:id", (req, res, next) => {
  const match = db.find((m) => m.id === +req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  return res.json(match);
});

app.post("/matches", verifyMatchDto, (req, res, next) => {
  const { date, homeTeam, score, visitorTeam } = req.body;
  const match = new Match(date, homeTeam, score, visitorTeam);
  db.push(match);
  return res.json(match);
});

app.put("/matches/:id", (req, res, next) => {
  const match = db.find((m) => m.id === +req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  const { date, homeTeam, score, visitorTeam } = req.body;
  match.date = date ?? match.date;
  match.homeTeam = homeTeam ?? match.homeTeam;
  match.score = score ?? match.score;
  match.visitorTeam = visitorTeam ?? match.visitorTeam;
  return res.json(match);
});

app.delete("/matches/:id", (req, res, next) => {
  const match = db.find((m) => m.id === +req.params.id);
  if (!match) {
    return next(new HttpError("Not found", 404));
  }
  db.splice(db.indexOf(match), 1);
  return res.sendStatus(204);
});

// * ==========================================
// * Error handling
// * ==========================================

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
