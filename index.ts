import { round } from "./functions/dumb";
import { getPrayerTimes } from "./functions/helpers/getPrayerTimes";

const MAKKAH = {
  LON: round(39.8173),
  LAT: round(21.4241),
};
const date = new Date();

function main() {
  const results = getPrayerTimes(date, { lon: MAKKAH.LON, lat: MAKKAH.LAT });

  console.log("----------------------------");
  console.log("Location Coordinates:");
  console.log(`Longitude: ${MAKKAH.LON}`);
  console.log(`Latitude: ${MAKKAH.LAT}`);
  console.log("----------------------------");

  console.log("Current Day:", results.extras.currentDayOfYear);
  console.log("Date:", date.toLocaleString());
  console.log("----------------------------");

  console.log(`Day Length: ${results.extras.dayLength}`);
  console.log("----------------------------");

  console.log("Prayer Times:");
  console.log(`Fajr: ${results.prayers.fajr.toLocaleTimeString()}`);
  console.log(`Sunrise: ${results.extras.sunrise.toLocaleTimeString()}`);
  console.log(`Dhuhr: ${results.prayers.dhuhr.toLocaleTimeString()}`);
  console.log(`Asr: ${results.prayers.asr.toLocaleTimeString()}`);
  console.log(`Maghrib: ${results.prayers.maghrib.toLocaleTimeString()}`);
  console.log(`Isha: ${results.prayers.isha.toLocaleTimeString()}`);
  console.log("----------------------------");
}

main();
