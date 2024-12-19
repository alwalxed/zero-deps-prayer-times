import type { Prayer } from "../types";

type Prayers = { name: Prayer; time: Date }[];

export function findNextPrayer(
  currentDate: Date,
  prayers: Prayers
): {
  name: Prayer;
  remainingSeconds: number;
} {
  const futurePrayers = prayers.filter((prayer) => prayer.time > currentDate);

  if (futurePrayers.length === 0) {
    return {
      name: "fajr",
      remainingSeconds: 0,
    };
  }

  const nextPrayer = futurePrayers.reduce((closestPrayer, currentPrayer) => {
    const closestDifference =
      closestPrayer.time.getTime() - currentDate.getTime();
    const currentDifference =
      currentPrayer.time.getTime() - currentDate.getTime();

    return currentDifference < closestDifference
      ? currentPrayer
      : closestPrayer;
  });

  const remainingSeconds = Math.floor(
    (nextPrayer.time.getTime() - currentDate.getTime()) / 1000
  );

  return {
    name: nextPrayer.name,
    remainingSeconds: remainingSeconds,
  };
}
