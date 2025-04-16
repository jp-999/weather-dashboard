// Format temperature to always show one decimal place
export const formatTemp = (temp) => {
  return `${temp.toFixed(1)}°C`;
};

// Get weather icon based on condition and time of day
export const getWeatherIcon = (condition, icon) => {
  const isNight = icon && icon.includes('n');
  // Return the appropriate icon name based on weather condition and time of day
  return isNight ? `${condition.toLowerCase()}-night` : condition.toLowerCase();
};

// Format date to a human-readable format
export const formatDate = (dateString) => {
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

// Format time from 24h to 12h format
export const formatTime = (time) => {
  if (time === 'Now') return time;
  
  const [hours] = time.split(':');
  const hour = parseInt(hours, 10);
  
  if (hour === 0) {
    return '12 AM';
  } else if (hour === 12) {
    return '12 PM';
  } else if (hour > 12) {
    return `${hour - 12} PM`;
  } else {
    return `${hour} AM`;
  }
};

// Get background gradient class based on weather condition and time
export const getWeatherBackground = (condition, icon) => {
  const isNight = icon && icon.includes('n');
  
  if (isNight) {
    return 'bg-gradient-to-br from-gray-900 to-blue-900';
  }
  
  switch (condition) {
    case 'Clear':
      return 'bg-gradient-to-br from-blue-500 to-blue-300';
    case 'Clouds':
      return 'bg-gradient-to-br from-gray-400 to-blue-400';
    case 'Rain':
    case 'Drizzle':
      return 'bg-gradient-to-br from-gray-700 to-blue-700';
    case 'Thunderstorm':
      return 'bg-gradient-to-br from-gray-800 to-purple-900';
    case 'Snow':
      return 'bg-gradient-to-br from-gray-200 to-blue-200';
    case 'Mist':
    case 'Fog':
      return 'bg-gradient-to-br from-gray-300 to-gray-400';
    default:
      return 'bg-gradient-to-br from-background-dark to-background';
  }
};

// Generate random precipitation data for hourly forecast
export const generatePrecipitationData = (hourlyData) => {
  return hourlyData.map(hour => ({
    time: formatTime(hour.time),
    precipitation: hour.precipitation
  }));
};

// Generate temperature data for the chart
export const generateTemperatureData = (hourlyData) => {
  return hourlyData.map(hour => ({
    time: formatTime(hour.time),
    temperature: hour.temp
  }));
}; 