export class Match {
  static id = 0;
  constructor(date, team1, score, team2) {
    this.date = date;
    this.team1 = team1;
    this.score = score;
    this.team2 = team2;
    this.id = Match.id++;
  }
}
