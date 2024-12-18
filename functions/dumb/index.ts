import { toHijri } from "hijri-date-converter";

export function radiansToDegrees(radians: number) {
  return (radians * 180.0) / Math.PI;
}

export function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180.0;
}

export function round(number: number) {
  return Math.round(number * 100) / 100;
}

export function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = round(minutes % 60).toFixed(0);
  return `${hours}:${remainingMinutes}`;
}

export function getDayOfYear(date: Date) {
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const diff = date.getTime() - startOfYear.getTime();
  return Math.floor(round(diff / (1000 * 60 * 60 * 24)) + 1);
}

export function isDateInRamadan(date: Date) {
  const hijri = toHijri(date);

  if (hijri.month === 9) {
    return true;
  }
  return false;
}
