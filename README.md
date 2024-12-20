# Zero Dependencies Prayer Times

A lightweight, embeddable Islamic prayer times calculator based on date and coordinates, with zero external dependencies.

## Key Features

- Zero Dependencies
- Embeddable
- Customizable

## Installation

```
npm install zero-deps-prayer-times
```

## Usage

Import the library and use the `getPrayerTimes` function to retrieve prayer times for a specific date and location.

```js
import { getPrayerTimes } from "zero-deps-prayer-times";

const date = new Date();
const coordinates = { latitude: 21.42251, longitude: 39.826168 };
const options = {
  convention: "Umm al-Qura University, Makkah",
  hanafiAsr: false,
};

const { data, error } = getPrayerTimes(date, coordinates, options);
```

## Returned Data

The `data` object contains prayer times and additional information, formatted as follows:

```js
{
  "prayers": {
    "fajr": {
      "date": "2024-12-20T05:30:00.000Z",
      "formatted12H": "05:30 AM",
      "formatted24H": "05:30"
    },
    "dhuhr": {
      "date": "2024-12-20T12:00:00.000Z",
      "formatted12H": "12:00 PM",
      "formatted24H": "12:00"
    },
    "asr": {
      "date": "2024-12-20T15:15:00.000Z",
      "formatted12H": "03:15 PM",
      "formatted24H": "15:15"
    },
    "maghrib": {
      "date": "2024-12-20T18:30:00.000Z",
      "formatted12H": "06:30 PM",
      "formatted24H": "18:30"
    },
    "isha": {
      "date": "2024-12-20T20:00:00.000Z",
      "formatted12H": "08:00 PM",
      "formatted24H": "20:00"
    }
  },
  "extras": {
    "sunrise": {
      "date": "2024-12-20T06:00:00.000Z",
      "formatted12H": "06:00 AM",
      "formatted24H": "06:00"
    },
    "midnight": {
      "date": "2024-12-20T23:15:00.000Z",
      "formatted12H": "11:15 PM",
      "formatted24H": "23:15"
    },
    "dayOfYear": 355,
    "dayLength": "12:30",
    "nextPrayer": {
      "name": "asr",
      "remainingSeconds": 5400
    }
  }
}
```

## Applications Built with This Library

- CLI Tool: [cli-prayer-times](https://github.com/alwalxed/cli-prayer-times)
- VS Code Extension: [vscode-extension-prayer-times](https://github.com/alwalxed/vscode-extension-prayer-times)

If you’ve created an application using this library, feel free to submit a PR to add your project here.

## Contributing

If you encounter any issues or have suggestions, please submit them via issues or PR

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/alwalxed/zero-deps-prayer-times/blob/main/LICENSE) file for details.
