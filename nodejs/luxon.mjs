import { birthdayDaysWithPhase } from "./fns-lunar.mjs";

const label = "Birthdays with phase execution took";

console.time(label);
const data = await birthdayDaysWithPhase("10-02-2000", "Yekaterinburg");
console.timeEnd(label);

console.log(data);
