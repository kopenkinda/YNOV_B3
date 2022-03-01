import http from "http";
import { birthdayDaysWithPhase } from "./fns-lunar.mjs";
import { URL } from "url";

const server = http.createServer();

server.addListener("request", (req, res) => {
  if (req.method === "GET" && req.url.startsWith("/?")) {
    const url = new URL(`http://fake.url${req.url}`);
    const params = url.searchParams;
    const city = params.get("city");
    const date = params.get("dateFrom");
    if (city === null || date === null) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("Bad request");
    }
    birthdayDaysWithPhase(date, city).then((data) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    });
  }
});

server.listen(3000);
