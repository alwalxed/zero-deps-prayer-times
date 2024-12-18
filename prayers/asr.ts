export function getAsrTime(
  noonTime: Date,
  lat: number,
  declination: number,
  hanafi: boolean = false
) {
  try {
    const shadowRatio = hanafi ? 2 : 1;

    const altitudeAsrRadians = Math.atan(
      1 /
        (shadowRatio + Math.tan(Math.abs(lat - declination) * (Math.PI / 180)))
    );

    const hourAngleAsrRadians = Math.acos(
      (Math.sin(altitudeAsrRadians) -
        Math.sin(lat * (Math.PI / 180)) *
          Math.sin(declination * (Math.PI / 180))) /
        (Math.cos(lat * (Math.PI / 180)) *
          Math.cos(declination * (Math.PI / 180)))
    );

    const asrOffsetMinutes =
      ((hourAngleAsrRadians * (180 / Math.PI)) / 15) * 60;

    const noonMinutesUTC =
      noonTime.getUTCHours() * 60 + noonTime.getUTCMinutes();

    const asrTimeMinutesUTC = noonMinutesUTC + asrOffsetMinutes;

    const hours = Math.floor(asrTimeMinutesUTC / 60);
    const minutes = Math.floor(asrTimeMinutesUTC % 60);
    const seconds = Math.round((asrTimeMinutesUTC % 1) * 60);

    return new Date(
      Date.UTC(
        noonTime.getUTCFullYear(),
        noonTime.getUTCMonth(),
        noonTime.getUTCDate(),
        hours,
        minutes,
        seconds
      )
    );
  } catch (error) {
    console.error("Error calculating Asr time");
    throw error;
  }
}
