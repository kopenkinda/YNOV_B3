import luxon from "luxon";

/**
 *
 * @param {any[]} array
 * @param {string} k
 * @returns any[]
 */
export const sortByKey = (array, k) => {
  const isDesc = k.startsWith("-");
  const key = isDesc ? k.slice(1) : k;
  if (key === "date") {
    return array.sort((a, b) => {
      const aDate = luxon.DateTime.fromJSDate(a.date);
      const bDate = luxon.DateTime.fromJSDate(b.date);
      return isDesc ? bDate.diff(aDate).valueOf() : aDate.diff(bDate).valueOf();
    });
  }
  return array.sort((a, b) => {
    const aValue = b[key];
    const bValue = a[key];
    if (typeof aValue === "string") {
      return isDesc
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return isDesc ? aValue - bValue : bValue - aValue;
  });
};
