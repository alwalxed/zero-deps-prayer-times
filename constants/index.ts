import type { PrayerTimeConventions } from "../types";

export const conventions: PrayerTimeConventions = [
  {
    convention: "Muslim World League",
    considersRamadan: false,
    conventionMethods: {
      fajr: "angle",
      isha: "angle",
    },
    angle: {
      fajr: 18,
      isha: 17,
    },
    time: {
      fajr: null,
      isha: null,
    },
  },
  {
    convention: "Islamic Society of North America (ISNA)",
    considersRamadan: false,
    conventionMethods: {
      fajr: "angle",
      isha: "angle",
    },
    angle: {
      fajr: 15,
      isha: 15,
    },
    time: {
      fajr: null,
      isha: null,
    },
  },
  {
    convention: "Egyptian General Authority of Survey",
    considersRamadan: false,
    conventionMethods: {
      fajr: "angle",
      isha: "angle",
    },
    angle: {
      fajr: 19.5,
      isha: 17.5,
    },
    time: {
      fajr: null,
      isha: null,
    },
  },
  {
    convention: "Umm al-Qura University, Makkah",
    considersRamadan: true,
    conventionMethods: {
      fajr: "angle",
      isha: "time",
    },
    angle: {
      fajr: 18.5,
      isha: null,
    },
    time: {
      fajr: null,
      isha: {
        nonRamadan: 90,
        ramadan: 120,
      },
    },
  },
  {
    convention: "University of Islamic Sciences, Karachi",
    considersRamadan: false,
    conventionMethods: {
      fajr: "angle",
      isha: "angle",
    },
    angle: {
      fajr: 18,
      isha: 18,
    },
    time: {
      fajr: null,
      isha: null,
    },
  },
  {
    convention: "Institute of Geophysics, University of Tehran",
    considersRamadan: false,
    conventionMethods: {
      fajr: "angle",
      isha: "angle",
    },
    angle: {
      fajr: 17.7,
      isha: 14,
    },
    time: {
      fajr: null,
      isha: null,
    },
  },
  {
    convention: "Shia Ithna Ashari, Leva Research Institute, Qum",
    considersRamadan: false,
    conventionMethods: {
      fajr: "angle",
      isha: "angle",
    },
    angle: {
      fajr: 16,
      isha: 14,
    },
    time: {
      fajr: null,
      isha: null,
    },
  },
] as const;
