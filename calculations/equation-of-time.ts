export function getEoT(dayOfYear: number): number {
  const meanLongitude = (280.46 + 0.9856474 * dayOfYear) % 360;
  const meanAnomaly = (357.528 + 0.9856003 * dayOfYear) % 360;
  const obliquity = 23.439 - 0.0000004 * dayOfYear;

  const rad = Math.PI / 180;

  const y = Math.tan((obliquity / 2) * rad) ** 2;

  const EoT =
    (y * Math.sin(2 * meanLongitude * rad) -
      2 * 0.0167 * Math.sin(meanAnomaly * rad) +
      4 *
        0.0167 *
        y *
        Math.sin(meanAnomaly * rad) *
        Math.cos(2 * meanLongitude * rad) -
      0.5 * y ** 2 * Math.sin(4 * meanLongitude * rad) -
      1.25 * 0.0167 ** 2 * Math.sin(2 * meanAnomaly * rad)) *
    (4 / rad);

  return EoT;
}
