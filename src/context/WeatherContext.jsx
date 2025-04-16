import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock weather data
const mockWeatherData = {
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
    }
  ]
};

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('London');
  const [recentLocations, setRecentLocations] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load mock data on mount
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call
        // For now, we'll use mock data
        setTimeout(() => {
          setCurrentWeather(mockWeatherData.current);
          setForecast(mockWeatherData.forecast);
          setHourlyForecast(mockWeatherData.hourly);
          setLoading(false);
        }, 1000); // Simulate API delay
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  // Change location and fetch new data
  const changeLocation = (newLocation) => {
    setLocation(newLocation);
    
    // Add to recent locations if not already in the list
    if (!recentLocations.includes(newLocation)) {
      setRecentLocations(prev => [newLocation, ...prev].slice(0, 5));
    }
  };

  // Toggle location as favorite
  const toggleFavorite = (locationName) => {
    if (favorites.includes(locationName)) {
      setFavorites(prev => prev.filter(loc => loc !== locationName));
    } else {
      setFavorites(prev => [...prev, locationName]);
    }
  };

  return (
    <WeatherContext.Provider 
      value={{
        currentWeather,
        forecast,
        hourlyForecast,
        loading,
        error,
        location,
        recentLocations,
        favorites,
        changeLocation,
        toggleFavorite
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}; 