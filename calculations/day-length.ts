import { round } from "../utils/formatting";

export function getDayLength(hourAngle: number, EoT: number) {
  try {
    const totalHourAngle = 2 * hourAngle;
    const dayLengthInHours = totalHourAngle / 15;

    let dayLengthInMinutes = dayLengthInHours * 60;
    dayLengthInMinutes += EoT;

    return Number(round(dayLengthInMinutes).toFixed(0));
  } catch (error) {
    console.error("Error calculating day length", error);
    throw error;
  }
}
