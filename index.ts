import { getDayLength } from "./calculations/day-length";
import { getDeclination } from "./calculations/declination";
import { getEoT } from "./calculations/equation-of-time";
import { getHourAngle } from "./calculations/hour-angle";
import { getAsrTime } from "./prayers/asr";
import { getDayBoundaryTime } from "./prayers/boundaries";
import { getFajrTime } from "./prayers/fajr";
import { getIshaTime } from "./prayers/isha";
import { getMidnight } from "./prayers/midnight";
import { getNoonTime } from "./prayers/noon";
import type { Coordinates, Options, PrayerTimesResult } from "./types";
import { getDayOfYear } from "./utils/date";
import { formatTime, minutesToTime } from "./utils/formatting";
import { findNextPrayer } from "./utils/helpers";
import { isValidCoordinates } from "./utils/validate";

/**
 * Calculates the Islamic prayer times for a given date and geographical location.
 *
 * This function computes the prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha,
 * as well as additional information such as sunrise, midnight, and the day length.
 * It also calculates the next prayer time based on the current date.
 * The calculation is influenced by the provided coordinates (latitude and longitude),
 * and optional settings for conventions (e.g., calculation methods) and Asr prayer calculation
 * (using the Hanafi method).
 *
 * @param date - The date for which the prayer times should be calculated. It must be a valid Date object.
 * @param coordinates - The geographical coordinates (longitude and latitude) of the location.
 * @param options - Optional settings that may influence the calculation methods, such as:
 *   - `convention`: Specifies the convention for Fajr and Isha calculation.
 *   - `hanafiAsr`: If true, the Hanafi method for Asr prayer calculation will be used.
 *
 * @returns An object containing the prayer times (`prayers`), additional information (`extras`), and any errors encountered:
 *   - `data`: An object with `prayers` (formatted prayer times) and `extras` (sunrise, midnight, day length, and next prayer).
 *   - `error`: An error object if calculation fails, or null if no error occurred.
 *
 * @throws {Error} If the input date is invalid, coordinates are out of range, or the location is in an unsupported polar region.
 */
export function getPrayerTimes(
  date: Date,
  coordinates: Coordinates,
  options: Options | undefined
): PrayerTimesResult {
  try {
    if (isNaN(date.getTime())) {
      return {
        data: null,
        error: new Error("Invalid date"),
      };
    }

    if (!isValidCoordinates(coordinates)) {
      return {
        data: null,
        error: new Error("Invalid coordinates"),
      };
    }

    const { longitude, latitude } = coordinates;

    const dayOfYear = getDayOfYear(date);
    const EoT = getEoT(dayOfYear);
    const declination = getDeclination(dayOfYear);
    const hourAngle = getHourAngle(latitude, declination);

    if (Math.abs(latitude) > 66.5) {
      return {
        data: null,
        error: new Error("Unsupported polar region"),
      };
    }

    const noonTime = getNoonTime(date, longitude, EoT);
    const { sunriseTime, maghribTime } = getDayBoundaryTime(
      longitude,
      hourAngle,
      date,
      EoT
    );
    const fajrTime = getFajrTime(
      noonTime,
      latitude,
      declination,
      options?.convention
    );
    const ishaTime = getIshaTime(maghribTime);
    const asrTime = getAsrTime(
      noonTime,
      latitude,
      declination,
      options?.hanafiAsr
    );
    const midnightTime = getMidnight(maghribTime, fajrTime);

    const dayLength = minutesToTime(getDayLength(hourAngle, EoT));

    const nextPrayer = findNextPrayer(date, [
      { name: "fajr", time: fajrTime },
      { name: "dhuhr", time: noonTime },
      { name: "asr", time: asrTime },
      { name: "maghrib", time: maghribTime },
      { name: "isha", time: ishaTime },
    ]);

    return {
      data: {
        prayers: {
          fajr: formatTime(fajrTime),
          dhuhr: formatTime(noonTime),
          asr: formatTime(asrTime),
          maghrib: formatTime(maghribTime),
          isha: formatTime(ishaTime),
        },
        extras: {
          midnight: formatTime(midnightTime),
          sunrise: formatTime(sunriseTime),
          dayOfYear: dayOfYear,
          dayLength: dayLength,
          nextPrayer,
        },
      },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error:
        err instanceof Error ? err : new Error("An unknown error occurred"),
    };
  }
}
