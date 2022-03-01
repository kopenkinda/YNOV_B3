import luxon from "luxon";
import fetch from "isomorphic-fetch";

const API_URL = (city, dt) =>
  `https://api.weatherapi.com/v1/astronomy.json?key=f66f60f2adc743bdb0595627210411&q=${city}&dt=${dt}`;

export const birthdayDaysWithPhase = async (
  fromDate,
  cityName = "Yekaterinburg"
) => {
  if (typeof fromDate === "string") {
    fromDate = new Date(fromDate);
  }
  const d = luxon.DateTime.fromJSDate(fromDate);
  const thisYear = luxon.DateTime.now().year;

  // const result = [];
  // for (let i = d.year; i <= thisYear; i++) {
  //   const promise = new Promise(async (resolve, reject) => {
  //     try {
  //       const yearsDate = d.plus({ year: i - d.year });
  //       const url = API_URL(cityName, yearsDate.toFormat("yyyy-MM-dd"));
  //       const phase = await fetch(url)
  //         .then((r) => r.json())
  //         .then(({ astronomy }) => astronomy.astro.moon_phase);
  //       resolve({
  //         year: yearsDate.year,
  //         day: yearsDate.weekdayLong,
  //         moonPhase: phase,
  //       });
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  //   result.push(promise);
  // }
  // return Promise.all(result);

  return Promise.all(
    Array.from({ length: thisYear - d.year + 1 }, (_, i) => {
      const p = new Promise(async (resolve, reject) => {
        try {
          const yearsDate = d.plus({ year: i });
          const url = API_URL(cityName, yearsDate.toFormat("yyyy-MM-dd"));
          const phase = await fetch(url)
            .then((r) => r.json())
            .then(({ astronomy }) => astronomy.astro.moon_phase);
          return resolve({
            year: yearsDate.year,
            day: yearsDate.weekdayLong,
            moonPhase: phase,
          });
        } catch (error) {
          reject(error);
        }
      });
      return p;
    })
  );
};
