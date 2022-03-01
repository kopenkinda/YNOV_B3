import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/theo", (req, res) => {
  res.send("♿️");
});

app.listen(3000, () => {
  console.log("Listening on: http://localhost:3000");
});
