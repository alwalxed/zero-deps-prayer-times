export type Prayer = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";

export type Coordinates = {
  longitude: number;
  latitude: number;
};

export type Options = {
  convention?: Convention;
  hanafiAsr?: boolean;
};

export type FormattedTime = {
  date: Date;
  formatted12H: string;
  formatted24H: string;
};

export type PrayerTimes = {
  fajr: FormattedTime;
  dhuhr: FormattedTime;
  asr: FormattedTime;
  maghrib: FormattedTime;
  isha: FormattedTime;
};

export type ExtraInfo = {
  sunrise: FormattedTime;
  midnight: FormattedTime;
  dayOfYear: number | string;
  dayLength: string;
  nextPrayer: {
    name: Prayer;
    remainingSeconds: number;
  };
};

export type PrayerTimesResult = {
  data: {
    prayers: PrayerTimes;
    extras: ExtraInfo;
  } | null;
  error: Error | null;
};

type ConventionMethod = "angle" | "time";

interface AngleMethod {
  fajr: number;
  isha: number | null;
}

interface TimeMethod {
  fajr: null;
  isha: {
    nonRamadan: number;
    ramadan: number;
  } | null;
}

export interface PrayerTimeConvention {
  convention: Convention;
  considersRamadan: boolean;
  conventionMethods: {
    fajr: ConventionMethod;
    isha: ConventionMethod;
  };
  angle: AngleMethod;
  time: TimeMethod;
}

export type PrayerTimeConventions = readonly PrayerTimeConvention[];
export type Convention =
  | "Muslim World League"
  | "Islamic Society of North America (ISNA)"
  | "Egyptian General Authority of Survey"
  | "Umm al-Qura University, Makkah"
  | "University of Islamic Sciences, Karachi"
  | "Institute of Geophysics, University of Tehran"
  | "Shia Ithna Ashari, Leva Research Institute, Qum";
