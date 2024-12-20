import { getPrayerTimes } from "../index";

describe("getPrayerTimes", () => {
  it("should return correct prayer times for a valid input", () => {
    const date = new Date("2023-07-15T12:00:00Z");
    const coordinates = { latitude: 51.5074, longitude: -0.1278 }; // London
    const result = getPrayerTimes(date, coordinates, undefined);

    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
    if (result.data) {
      expect(result.data.prayers).toHaveProperty("fajr");
      expect(result.data.prayers).toHaveProperty("dhuhr");
      expect(result.data.prayers).toHaveProperty("asr");
      expect(result.data.prayers).toHaveProperty("maghrib");
      expect(result.data.prayers).toHaveProperty("isha");
      expect(result.data.extras).toHaveProperty("sunrise");
      expect(result.data.extras).toHaveProperty("midnight");
    }
  });

  it("should return an error for an invalid date", () => {
    const invalidDate = new Date("invalid date");
    const coordinates = { latitude: 51.5074, longitude: -0.1278 };
    const result = getPrayerTimes(invalidDate, coordinates, undefined);

    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe("Invalid date");
  });

  it("should return an error for invalid coordinates", () => {
    const date = new Date("2023-07-15T12:00:00Z");
    const invalidCoordinates = { latitude: 91, longitude: -0.1278 };
    const result = getPrayerTimes(date, invalidCoordinates, undefined);

    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe("Invalid coordinates");
  });

  it("should return an error for polar regions", () => {
    const date = new Date("2023-07-15T12:00:00Z");
    const polarCoordinates = { latitude: 70, longitude: -0.1278 };
    const result = getPrayerTimes(date, polarCoordinates, undefined);

    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe("Unsupported polar region");
  });

  it("should return correct prayer times for a specific date and location", () => {
    const date = new Date("2023-07-15T12:00:00Z");
    const coordinates = { latitude: 51.5074, longitude: -0.1278 }; // London
    const result = getPrayerTimes(date, coordinates, undefined);

    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
    if (result.data) {
      // Check the structure of the prayer times
      expect(result.data.prayers.fajr).toHaveProperty("date");
      expect(result.data.prayers.fajr).toHaveProperty("formatted12H");
      expect(result.data.prayers.fajr).toHaveProperty("formatted24H");

      // Check if the formatted times are strings
      expect(typeof result.data.prayers.fajr.formatted24H).toBe("string");
      expect(typeof result.data.prayers.dhuhr.formatted24H).toBe("string");
      expect(typeof result.data.prayers.asr.formatted24H).toBe("string");
      expect(typeof result.data.prayers.maghrib.formatted24H).toBe("string");
      expect(typeof result.data.prayers.isha.formatted24H).toBe("string");

      // Check if the dates are valid
      expect(result.data.prayers.fajr.date).toBeInstanceOf(Date);
      expect(result.data.prayers.dhuhr.date).toBeInstanceOf(Date);
      expect(result.data.prayers.asr.date).toBeInstanceOf(Date);
      expect(result.data.prayers.maghrib.date).toBeInstanceOf(Date);
      expect(result.data.prayers.isha.date).toBeInstanceOf(Date);

      // Check extras
      expect(typeof result.data.extras.sunrise.formatted24H).toBe("string");
      expect(result.data.extras.dayOfYear).toBe(196);
      expect(typeof result.data.extras.dayLength).toBe("string");
      expect(result.data.extras.nextPrayer).toHaveProperty("name");
      expect(result.data.extras.nextPrayer).toHaveProperty("remainingSeconds");
    }
  });
});
