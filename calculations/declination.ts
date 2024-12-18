import { round } from "../utils/formatting";

export function getDeclination(dayOfYear: number) {
  const tilt = 23.44;
  const degToRad = Math.PI / 180.0;
  const radToDeg = 180.0 / Math.PI;

  const M = (357.5291 + 0.98560028 * dayOfYear) % 360;

  let L =
    M +
    1.9148 * Math.sin(M * degToRad) +
    0.02 * Math.sin(2 * M * degToRad) +
    282.9404;

  L = L % 360;

  const declination =
    Math.asin(Math.sin(L * degToRad) * Math.sin(tilt * degToRad)) * radToDeg;

  return round(declination);
}
