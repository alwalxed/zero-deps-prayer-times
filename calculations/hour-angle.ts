import { degreesToRadians, radiansToDegrees } from "../utils/conversions";
import { round } from "../utils/formatting";

export function getHourAngle(
  lat: number,
  declination: number,
  altitude: number = -0.83 // Standard solar depression angle
) {
  const latRad = degreesToRadians(lat);
  const decRad = degreesToRadians(declination);
  const altRad = degreesToRadians(altitude);

  const cosH =
    (Math.sin(altRad) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));

  if (cosH < -1 || cosH > 1) {
    return 0;
  }
  const hourAngleRad = Math.acos(cosH);
  const hourAngleDeg = radiansToDegrees(hourAngleRad);
  return round(hourAngleDeg);
}
