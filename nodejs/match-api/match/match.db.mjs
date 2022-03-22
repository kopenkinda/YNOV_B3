import { Match } from "./Match.entity.mjs";

let day = 0;
const offset = 1000 * 60 * 60 * 24;

export const db = [
  new Match(new Date(Date.now() - ++day * offset), "Team1_1", [1, 1], "Team2_1"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_2", [2, 1], "Team2_2"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_3", [3, 1], "Team2_3"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_4", [4, 1], "Team2_4"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_5", [5, 1], "Team2_5"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_6", [1, 1], "Team2_6"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_7", [2, 1], "Team2_7"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_8", [3, 1], "Team2_8"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_9", [4, 1], "Team2_9"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_10", [5, 1], "Team2_10"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_11", [1, 1], "Team2_11"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_12", [2, 1], "Team2_12"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_13", [3, 1], "Team2_13"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_14", [4, 1], "Team2_14"),
  new Match(new Date(Date.now() - ++day * offset), "Team1_15", [5, 1], "Team2_15"),
];
