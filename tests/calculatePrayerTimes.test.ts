import { calculatePrayerTimes } from "..";
import { getDayOfYear } from "../utils/date";

describe("calculatePrayerTimes", () => {
  const validCoordinates = {
    latitude: 21.4225,
    longitude: 39.8262,
  };

  describe("Valid Input", () => {
    it("should calculate prayer times for a standard date and location", () => {
      const testDate = new Date("2024-01-15");

      const result = calculatePrayerTimes(testDate, validCoordinates);

      expect(result.error).toBeNull();
      expect(result.data).toBeTruthy();
      expect(result.data?.prayers).toHaveProperty("fajr");
      expect(result.data?.prayers).toHaveProperty("dhuhr");
      expect(result.data?.prayers).toHaveProperty("asr");
      expect(result.data?.prayers).toHaveProperty("maghrib");
      expect(result.data?.prayers).toHaveProperty("isha");
      expect(result.data?.extras).toHaveProperty("sunrise");
      expect(result.data?.extras.dayOfYear).toBe(getDayOfYear(testDate));
      expect(result.data?.extras).toHaveProperty("dayLength");

      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5]\d\s?[AP]M$/;
      Object.values(result.data!.prayers).forEach((time) => {
        expect(time).toMatch(timeRegex);
      });
    });
  });

  describe("Error Handling", () => {
    it("should return an error for invalid date", () => {
      const invalidDate = new Date("invalid-date");

      const result = calculatePrayerTimes(invalidDate, validCoordinates);

      expect(result.data).toBeNull();
      expect(result.error).toBeTruthy();
      expect(result.error?.message).toBe("Invalid date");
    });

    it("should return an error for invalid coordinates", () => {
      const testDate = new Date("2024-01-15");
      const invalidCoordinates = {
        latitude: 1000,
        longitude: 2000,
      };

      const result = calculatePrayerTimes(testDate, invalidCoordinates);

      expect(result.data).toBeNull();
      expect(result.error).toBeTruthy();
      expect(result.error?.message).toBe("Invalid coordinates");
    });

    it("should return an error for polar regions", () => {
      const testDate = new Date("2024-01-15");
      const polarCoordinates = {
        latitude: 80,
        longitude: 0,
      };

      const result = calculatePrayerTimes(testDate, polarCoordinates);

      expect(result.data).toBeNull();
      expect(result.error).toBeTruthy();
      expect(result.error?.message).toBe("Unsupported polar region");
    });
  });

  describe("Location Variations", () => {
    const testLocations = [
      {
        name: "Makkah",
        coordinates: { latitude: 21.4225, longitude: 39.8262 },
      },
      {
        name: "New York",
        coordinates: { latitude: 40.7128, longitude: -74.006 },
      },
      {
        name: "Sydney",
        coordinates: { latitude: -33.8688, longitude: 151.2093 },
      },
    ];

    testLocations.forEach(({ name, coordinates }) => {
      it(`should calculate prayer times for ${name}`, () => {
        const testDate = new Date("2024-01-15");

        const result = calculatePrayerTimes(testDate, coordinates);

        expect(result.error).toBeNull();
        expect(result.data).toBeTruthy();

        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5]\d\s?[AP]M$/;
        Object.values(result.data!.prayers).forEach((time) => {
          expect(time).toMatch(timeRegex);
        });

        const prayerTimes = Object.values(result.data!.prayers);
        const uniqueTimes = new Set(prayerTimes);
        expect(uniqueTimes.size).toBe(prayerTimes.length);
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle dates across different years", () => {
      const testDates = [
        new Date("2023-12-31"),
        new Date("2024-01-01"),
        new Date("2024-12-31"),
        new Date("2025-01-01"),
      ];

      testDates.forEach((testDate) => {
        const result = calculatePrayerTimes(testDate, validCoordinates);

        expect(result.error).toBeNull();
        expect(result.data).toBeTruthy();
        expect(result.data?.extras.dayOfYear).toBe(getDayOfYear(testDate));
      });
    });

    it("should handle extreme dates", () => {
      const testDates = [new Date("1900-01-01"), new Date("2100-12-31")];

      testDates.forEach((testDate) => {
        const result = calculatePrayerTimes(testDate, validCoordinates);

        expect(result.error).toBeNull();
        expect(result.data).toBeTruthy();
      });
    });
  });
});
