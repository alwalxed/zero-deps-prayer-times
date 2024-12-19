import { conventions } from "../constants";
import type { Convention, PrayerTimeConvention } from "../types";

export function getFajrTime(
  noonTime: Date,
  lat: number,
  declination: number,
  convention: Convention = "Umm al-Qura University, Makkah"
) {
  try {
    const selectedConvention = conventions.find(
      (item) => item.convention === convention
    ) as PrayerTimeConvention;

    const fajrSolarAngle = selectedConvention?.angle.fajr ?? 18.5;

    const fajrHourAngle = Math.acos(
      (Math.cos((90 + Math.abs(fajrSolarAngle)) * (Math.PI / 180)) -
        Math.sin(lat * (Math.PI / 180)) *
          Math.sin(declination * (Math.PI / 180))) /
        (Math.cos(lat * (Math.PI / 180)) *
          Math.cos(declination * (Math.PI / 180)))
    );

    const fajrOffsetMinutes = (-(fajrHourAngle * (180 / Math.PI)) / 15) * 60;

    const noonMinutesUTC =
      noonTime.getUTCHours() * 60 + noonTime.getUTCMinutes();

    const fajrTimeMinutesUTC = noonMinutesUTC + fajrOffsetMinutes;

    const hours = Math.floor(fajrTimeMinutesUTC / 60);
    const minutes = Math.floor(fajrTimeMinutesUTC % 60);
    const seconds = Math.round((fajrTimeMinutesUTC % 1) * 60);

    return new Date(
      Date.UTC(
        noonTime.getUTCFullYear(),
        noonTime.getUTCMonth(),
        noonTime.getUTCDate(),
        hours,
        minutes,
        seconds
      )
    );
  } catch (error) {
    console.error("Error calculating Fajr time");
    throw error;
  }
}
