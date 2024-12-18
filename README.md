# Zero Dependencies Prayer Times

Embedable Islamic prayer times calculator for date and coordinates.

## Installation (NPM)

```
npm install zero-deps-prayer-times
```

## Usage

```js
import { calculatePrayerTimes } from "zero-deps-prayer-times";

const date = new Date();
const coordinates = { latitude: 21.42251, longitude: 39.826168 };

// similar to supabase, returns data and error
const { data, error } = calculatePrayerTimes(date, coordinates);

if (error) {
  console.error("Error:", error.message);
  return;
}

console.log("Prayer Times Data:", data);
```

## Returned Data

`data` is an object containing prayer times and extras. Example output:

```js
 {
   "prayers": {
     "fajr": "05:30 AM",
     "dhuhr": "1:02 PM",
     "asr": "3:30 PM",
     "maghrib": "6:45 PM",
     "isha": "8:00 PM"
   },
   "extras": {
     "sunrise": "06:00 AM",
     "dayOfYear": 345,
     "dayLength": "12:30"
   }
 }

```

## Contributing

If you encounter any issues or have suggestions, please submit them via issues or pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/alwalxed/zero-deps-prayer-times/blob/main/LICENSE) file for details.
