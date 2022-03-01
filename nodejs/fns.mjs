import luxon from "luxon";

export const birthdayDays = (date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const d = luxon.DateTime.fromJSDate(date);
  const thisYear = luxon.DateTime.now().year;

  // const result = [];
  // for (let i = d.year; i <= thisYear; i++) {
  //   const yearsDate = d.plus({ year: i - d.year });
  //   result.push({
  //     year: i,
  //     day: yearsDate.weekdayLong,
  //   });
  // }
  // return result;

  return Array.from({ length: thisYear - d.year + 1 }, (_, i) => {
    const yearsDate = d.plus({ year: i });
    return {
      year: yearsDate.year,
      day: yearsDate.weekdayLong,
    };
  }).reduce((a, v) => {
    if (!(v.day in a)) {
      a[v.day] = 0;
    }
    a[v.day]++;
    return a;
  }, {});
};
