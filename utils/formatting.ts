export function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = round(minutes % 60).toFixed(0);
  return `${hours}:${remainingMinutes}`;
}

export function round(number: number) {
  return Math.round(number * 100) / 100;
}

function formatTimeHHMM12Hour(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatTimeHHMM24Hour(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatTime(date: Date) {
  return {
    date: date,
    formatted12H: formatTimeHHMM12Hour(date),
    formatted24H: formatTimeHHMM24Hour(date),
  };
}
