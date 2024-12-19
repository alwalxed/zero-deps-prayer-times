export function getMidnight(maghrib: Date, fajr: Date) {
  try {
    const maghribUTCMinutes =
      maghrib.getUTCHours() * 60 + maghrib.getUTCMinutes();
    const fajrUTCMinutes = fajr.getUTCHours() * 60 + fajr.getUTCMinutes();

    const midnightUTCMinutes = (maghribUTCMinutes + fajrUTCMinutes) / 2;

    const hours = Math.floor(midnightUTCMinutes / 60);
    const minutes = Math.floor(midnightUTCMinutes % 60);
    const seconds = Math.round((midnightUTCMinutes % 1) * 60);

    return new Date(
      Date.UTC(
        maghrib.getUTCFullYear(),
        maghrib.getUTCMonth(),
        maghrib.getUTCDate(),
        hours,
        minutes,
        seconds
      )
    );
  } catch (error) {
    console.error("Error calculating Midnight time");
    throw error;
  }
}
