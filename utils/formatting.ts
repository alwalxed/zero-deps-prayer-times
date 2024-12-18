export function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = round(minutes % 60).toFixed(0);
  return `${hours}:${remainingMinutes}`;
}

export function round(number: number) {
  return Math.round(number * 100) / 100;
}

export function formatTimeHHMM(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
