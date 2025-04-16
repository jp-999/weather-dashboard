import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

// This is a simple wrapper around the WeatherContext
// It makes it easier to use weather data in components
export const useWeather = () => {
  const context = useContext(WeatherContext);
  
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  
  return context;
};

export default useWeather; 