import { isDateInRamadan } from "../utils/date";

const ramadanAdjustmentMinutes = 120;
const normalAdjustmentMinutes = 90;

export function getIshaTime(maghrib: Date) {
  try {
    const isRamadan = isDateInRamadan(maghrib);

    const adjustmentMinutes = isRamadan
      ? ramadanAdjustmentMinutes
      : normalAdjustmentMinutes;

    const ishaTimeUTC =
      maghrib.getUTCHours() * 60 + maghrib.getUTCMinutes() + adjustmentMinutes;

    const hours = Math.floor(ishaTimeUTC / 60);
    const minutes = Math.floor(ishaTimeUTC % 60);
    const seconds = Math.round((ishaTimeUTC % 1) * 60);

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
    console.error("Error calculating Isha time");
    throw error;
  }
}
