import { getAsrTime } from "../../times/asr";
import { getDayBoundaryTime } from "../../times/boundaries";
import { getFajrTime } from "../../times/fajr";
import { getIshaTime } from "../../times/isha";
import { getNoonTime } from "../../times/noon";
import { getDayOfYear, minutesToTime } from "../dumb";
import { getDayLength } from "../math/dayLength";
import { getDeclination } from "../math/declination";
import { getEoT } from "../math/EoT";
import { getHourAngle } from "../math/hourAngle";

export function getPrayerTimes(
  date: Date,
  coordinates: { lon: number; lat: number }
) {
  const { lon, lat } = coordinates;

  const dayOfYear = getDayOfYear(date);
  const EoT = getEoT(dayOfYear);
  const declination = getDeclination(dayOfYear);
  const hourAngle = getHourAngle(lat, declination);

  const noonTime = getNoonTime(date, lon, EoT);
  const { sunriseTime, maghribTime } = getDayBoundaryTime(
    lon,
    hourAngle,
    date,
    EoT
  );
  const fajrTime = getFajrTime(noonTime, lat, declination);
  const ishaTime = getIshaTime(maghribTime);
  const asrTime = getAsrTime(noonTime, lat, declination);

  const dayLengthMinutes = getDayLength(hourAngle, EoT);
  const dayLengthTime = minutesToTime(dayLengthMinutes);

  return {
    prayers: {
      fajr: fajrTime,
      dhuhr: noonTime,
      asr: asrTime,
      maghrib: maghribTime,
      isha: ishaTime,
    },
    extras: {
      currentDayOfYear: dayOfYear,
      sunrise: sunriseTime,
      dayLength: dayLengthTime,
    },
  };
}
