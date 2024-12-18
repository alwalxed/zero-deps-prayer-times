export function getNoonTime(date: Date, lon: number, EoT: number) {
  try {
    if (typeof lon !== "number" || lon < -180 || lon > 180) {
      throw new Error("lon must be a number between -180 and 180");
    }

    const solarNoonUTC = 12 * 60 - lon * 4 - EoT;
    const hours = Math.floor(solarNoonUTC / 60);
    const minutes = Math.floor(solarNoonUTC % 60);
    const seconds = Math.round((solarNoonUTC % 1) * 60);

    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        hours,
        minutes,
        seconds
      )
    );
  } catch (error) {
    console.error("Error calculating solar noon");
    throw error;
  }
}
