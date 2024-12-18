export type Coordinates = {
  longitude: number;
  latitude: number;
};

export type PrayerTimes = {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

export type ExtraInfo = {
  dayOfYear: number | string;
  sunrise: string;
  dayLength: string;
};

export type PrayerTimesResult = {
  data: {
    prayers: PrayerTimes;
    extras: ExtraInfo;
  } | null;
  error: Error | null;
};
