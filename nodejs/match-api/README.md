## Install

```
npm i
```

## Run

```
node server.mjs
```

## Routes

GET /match ?sort=(-)[team1 | team2 | date] ?page=Number ?size=Number[5-50]
POST /match {"team1": "String", "team2": "String", "score": [0, 0], "date": "Date"}

GET /match/:id
PUT /match/:id {"team1": "String", "team2": "String", "score": [0, 0], "date": "Date"}
PATCH /match/:id {"team1"?: "String", "team2"?: "String", "score"?: [0, 0], "date"?: "Date"}
DELETE /match/:id
