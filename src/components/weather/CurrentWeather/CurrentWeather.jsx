import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../common/Card/Card';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { useWeather } from '../../../context/WeatherContext';
import { formatTemp } from '../../../utils/helpers';

const CurrentWeather = () => {
  const { currentWeather, loading, location } = useWeather();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <Card variant="glass" className="p-8 text-center" animate>
        <h2 className="text-xl font-medium text-white/80">No weather data available</h2>
        <p className="text-white/50 mt-2">Please try another location</p>
      </Card>
    );
  }

  // Framer Motion variants for staggered animations
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Weather icon based on condition
  const getWeatherIcon = () => {
    const main = currentWeather.weather.main;
    
    switch (main) {
      case 'Clear':
        return (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-yellow-300 glowing" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </motion.svg>
        );
      case 'Clouds':
        return (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-white/80" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              repeatType: "loop", 
              ease: "easeInOut" 
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </motion.svg>
        );
      case 'Rain':
        return (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-blue-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M16 14l1 6M8 14l1 6M12 16l1 6" 
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: [0, 10], opacity: [1, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "linear",
                times: [0, 1] 
              }}
            />
          </motion.svg>
        );
      default:
        return (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </motion.svg>
        );
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      variants={cardContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={cardItemVariants} className="lg:col-span-2">
        <Card variant="glass" className="overflow-hidden p-0" animate>
          <div className="relative bg-gradient-to-br from-blue-500/50 to-purple-500/30 p-8">
            {/* Weather condition icon */}
            <div className="absolute top-6 right-6 text-white/80">
              {getWeatherIcon()}
            </div>
            
            {/* Location and time */}
            <div className="mb-6">
              <motion.h1 
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {location}
              </motion.h1>
              <p className="text-white/60">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}
              </p>
            </div>
            
            {/* Temperature */}
            <div className="flex items-end">
              <motion.div 
                className="text-8xl font-light"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentWeather.temp}°
              </motion.div>
              <div className="ml-4 mb-3">
                <div className="text-xl">{currentWeather.weather.main}</div>
                <div className="text-white/60 capitalize">{currentWeather.weather.description}</div>
              </div>
            </div>
          </div>
          
          {/* Weather details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
            <div className="text-center p-3">
              <div className="text-white/60 text-sm mb-1">Feels Like</div>
              <div className="text-xl font-medium">{formatTemp(currentWeather.feels_like)}</div>
            </div>
            <div className="text-center p-3">
              <div className="text-white/60 text-sm mb-1">Humidity</div>
              <div className="text-xl font-medium">{currentWeather.humidity}%</div>
            </div>
            <div className="text-center p-3">
              <div className="text-white/60 text-sm mb-1">Wind</div>
              <div className="text-xl font-medium">{currentWeather.wind_speed} km/h</div>
            </div>
            <div className="text-center p-3">
              <div className="text-white/60 text-sm mb-1">Pressure</div>
              <div className="text-xl font-medium">{currentWeather.pressure} hPa</div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Additional Info Cards */}
      <motion.div variants={cardItemVariants} className="space-y-6">
        <Card variant="glass" className="p-6" animate>
          <h3 className="text-white/70 text-sm font-medium mb-3">UV Index</h3>
          <div className="flex items-center">
            <div className="text-3xl font-medium mr-2">{currentWeather.uv_index}</div>
            <div className="text-white/60 text-sm">
              {currentWeather.uv_index < 3 ? 'Low' : 
               currentWeather.uv_index < 6 ? 'Moderate' : 
               currentWeather.uv_index < 8 ? 'High' : 'Very High'}
            </div>
          </div>
          <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-green-300 via-yellow-300 to-red-500 h-2" 
              initial={{ width: 0 }}
              animate={{ width: `${(currentWeather.uv_index / 11) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-6" animate>
          <h3 className="text-white/70 text-sm font-medium mb-3">Visibility</h3>
          <div className="flex items-center">
            <div className="text-3xl font-medium mr-2">
              {(currentWeather.visibility / 1000).toFixed(1)}
            </div>
            <div className="text-white/60 text-sm">km</div>
          </div>
          <p className="text-white/50 text-sm mt-2">
            {currentWeather.visibility >= 10000 ? 'Excellent' : 
             currentWeather.visibility >= 5000 ? 'Good' : 'Limited'} visibility
          </p>
        </Card>
        
        <Card variant="glass" className="p-6" animate>
          <h3 className="text-white/70 text-sm font-medium mb-2">Precipitation</h3>
          <div className="flex items-center">
            <div className="text-3xl font-medium mr-2">
              {currentWeather.precipitation}
            </div>
            <div className="text-white/60 text-sm">mm</div>
          </div>
          <p className="text-white/50 text-sm mt-2">
            {currentWeather.precipitation === 0 ? 'No precipitation' : 
             currentWeather.precipitation < 2.5 ? 'Light precipitation' :
             currentWeather.precipitation < 7.5 ? 'Moderate precipitation' : 'Heavy precipitation'}
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CurrentWeather; 