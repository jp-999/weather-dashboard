// Mock weather data for development
export const mockWeatherData = {
  current: {
    temp: 25,
    feels_like: 27,
    humidity: 65,
    wind_speed: 12,
    pressure: 1012,
    visibility: 10000,
    uv_index: 5.2,
    weather: {
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    },
    precipitation: 0,
    dt: new Date().getTime(),
  },
  forecast: [
    {
      date: "Today",
      temp: {
        min: 18,
        max: 28
      },
      weather: {
        main: "Clear",
        description: "clear sky",
        icon: "01d"
      },
      precipitation: 0,
      humidity: 65,
      wind_speed: 12
    },
    {
      date: "Tomorrow",
      temp: {
        min: 17,
        max: 27
      },
      weather: {
        main: "Clouds",
        description: "scattered clouds",
        icon: "03d"
      },
      precipitation: 0,
      humidity: 60,
      wind_speed: 10
    },
    {
      date: "Wednesday",
      temp: {
        min: 16,
        max: 26
      },
      weather: {
        main: "Clouds",
        description: "broken clouds",
        icon: "04d"
      },
      precipitation: 0,
      humidity: 55,
      wind_speed: 8
    },
    {
      date: "Thursday",
      temp: {
        min: 15,
        max: 25
      },
      weather: {
        main: "Rain",
        description: "light rain",
        icon: "10d"
      },
      precipitation: 2.5,
      humidity: 70,
      wind_speed: 14
    },
    {
      date: "Friday",
      temp: {
        min: 16,
        max: 23
      },
      weather: {
        main: "Rain",
        description: "moderate rain",
        icon: "10d"
      },
      precipitation: 8.2,
      humidity: 85,
      wind_speed: 18
    }
  ],
  hourly: [
    {
      time: "Now",
      temp: 25,
      weather: {
        main: "Clear",
        icon: "01d"
      },
      precipitation: 0
    },
    {
      time: "13:00",
      temp: 26,
      weather: {
        main: "Clear",
        icon: "01d"
      },
      precipitation: 0
    },
    {
      time: "14:00",
      temp: 27,
      weather: {
        main: "Clear",
        icon: "01d"
      },
      precipitation: 0
    },
    {
      time: "15:00",
      temp: 28,
      weather: {
        main: "Clear",
        icon: "01d"
      },
      precipitation: 0
    },
    {
      time: "16:00",
      temp: 27,
      weather: {
        main: "Clear",
        icon: "01d"
      },
      precipitation: 0
    },
    {
      time: "17:00",
      temp: 25,
      weather: {
        main: "Clear",
        icon: "01d"
      },
      precipitation: 0
    },
    {
      time: "18:00",
      temp: 23,
      weather: {
        main: "Clear",
        icon: "01n"
      },
      precipitation: 0
    },
    {
      time: "19:00",
      temp: 21,
      weather: {
        main: "Clear",
        icon: "01n"
      },
      precipitation: 0
    },
    {
      time: "20:00",
      temp: 20,
      weather: {
        main: "Clear",
        icon: "01n"
      },
      precipitation: 0
    },
    {
      time: "21:00",
      temp: 19,
      weather: {
        main: "Clear",
        icon: "01n"
      },
      precipitation: 0
    },
    {
      time: "22:00",
      temp: 18,
      weather: {
        main: "Clear",
        icon: "01n"
      },
      precipitation: 0
    },
    {
      time: "23:00",
      temp: 18,
      weather: {
        main: "Clear",
        icon: "01n"
      },
      precipitation: 0
    }
  ]
};

// City names for search suggestions
export const popularCities = [
  "London",
  "New York",
  "Tokyo",
  "Paris",
  "Sydney",
  "Berlin",
  "Moscow",
  "Dubai",
  "Singapore",
  "Los Angeles",
  "Rome",
  "Toronto"
];

// Weather conditions with their corresponding icons
export const weatherIcons = {
  "Clear": "sun",
  "Clouds": "cloud",
  "Rain": "cloud-rain",
  "Drizzle": "cloud-drizzle",
  "Thunderstorm": "cloud-lightning",
  "Snow": "cloud-snow",
  "Mist": "align-justify",
  "Smoke": "align-justify",
  "Haze": "align-justify",
  "Dust": "align-justify",
  "Fog": "align-justify",
  "Sand": "align-justify",
  "Ash": "align-justify",
  "Squall": "wind",
  "Tornado": "activity"
}; 