import { birthdayDaysWithPhase } from "./fns-lunar.mjs";

console.time("Birthdays with phase execution took");
const data = await birthdayDaysWithPhase("10-02-2000", "Yekaterinburg");
console.timeEnd("Birthdays with phase execution took");

console.log(data);
