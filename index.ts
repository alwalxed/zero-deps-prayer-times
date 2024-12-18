import { getDayLength } from "./calculations/day-length";
import { getDeclination } from "./calculations/declination";
import { getEoT } from "./calculations/equation-of-time";
import { getHourAngle } from "./calculations/hour-angle";
import { getAsrTime } from "./prayers/asr";
import { getDayBoundaryTime } from "./prayers/boundaries";
import { getFajrTime } from "./prayers/fajr";
import { getIshaTime } from "./prayers/isha";
import { getNoonTime } from "./prayers/noon";
import type { Coordinates, PrayerTimesResult } from "./types";
import { getDayOfYear } from "./utils/date";
import { formatTimeHHMM, minutesToTime } from "./utils/formatting";
import { isValidCoordinates } from "./utils/validate";

export function calculatePrayerTimes(
  date: Date,
  coordinates: Coordinates
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
    const fajrTime = getFajrTime(noonTime, latitude, declination);
    const ishaTime = getIshaTime(maghribTime);
    const asrTime = getAsrTime(noonTime, latitude, declination);

    const dayLength = minutesToTime(getDayLength(hourAngle, EoT));

    return {
      data: {
        prayers: {
          fajr: formatTimeHHMM(fajrTime),
          dhuhr: formatTimeHHMM(noonTime),
          asr: formatTimeHHMM(asrTime),
          maghrib: formatTimeHHMM(maghribTime),
          isha: formatTimeHHMM(ishaTime),
        },
        extras: {
          sunrise: formatTimeHHMM(sunriseTime),
          dayOfYear: dayOfYear,
          dayLength: dayLength,
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
