export function isValidCoordinates(coordinates: {
  longitude: number;
  latitude: number;
}): boolean {
  const { longitude: lon, latitude: lat } = coordinates;

  if (lat < -90 || lat > 90) {
    return false;
  }

  if (lon < -180 || lon > 180) {
    return false;
  }

  return true;
}
