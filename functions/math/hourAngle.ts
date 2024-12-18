import { degreesToRadians, radiansToDegrees, round } from "../dumb";

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
    throw new Error(
      "No sunrise or sunset on this day for the given lat and declination."
    );
  }
  const hourAngleRad = Math.acos(cosH);
  const hourAngleDeg = radiansToDegrees(hourAngleRad);
  return round(hourAngleDeg);
}
