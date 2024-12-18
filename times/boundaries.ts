export function getDayBoundaryTime(
  lon: number,
  hourAngle: number,
  date: Date,
  EoT: number
) {
  try {
    if (typeof lon !== "number" || lon < -180 || lon > 180) {
      throw new Error("lon must be a number between -180 and 180");
    }

    const solarNoonUTC = 12 * 60 - lon * 4 - EoT;

    const sunriseUTC = solarNoonUTC - hourAngle * 4;
    const sunsetUTC = solarNoonUTC + hourAngle * 4;

    const sunriseHours = Math.floor(sunriseUTC / 60);
    const sunriseMinutes = Math.floor(sunriseUTC % 60);
    const sunriseSeconds = Math.round((sunriseUTC % 1) * 60);

    const sunsetHours = Math.floor(sunsetUTC / 60);
    const sunsetMinutes = Math.floor(sunsetUTC % 60);
    const sunsetSeconds = Math.round((sunsetUTC % 1) * 60);

    const sunriseTime = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        sunriseHours,
        sunriseMinutes,
        sunriseSeconds
      )
    );

    const maghribTime = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        sunsetHours,
        sunsetMinutes,
        sunsetSeconds
      )
    );

    return { sunriseTime, maghribTime };
  } catch (error) {
    console.error("Error calculating sunrise and sunset");
    throw error;
  }
}
