import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../common/Card/Card';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { useWeather } from '../../../context/WeatherContext';

const Forecast = () => {
  const { forecast, loading } = useWeather();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!forecast || forecast.length === 0) {
    return (
      <Card variant="glass" className="p-8 text-center" animate>
        <h2 className="text-xl font-medium text-white/80">No forecast data available</h2>
        <p className="text-white/50 mt-2">Please try another location</p>
      </Card>
    );
  }

  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  // Helper to select weather icon animation based on condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-yellow-300 glowing" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
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
            className="h-12 w-12 text-white/80 floating" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </motion.svg>
        );
      case 'Rain':
        return (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-blue-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M16 14l1 6M8 14l1 6M12 16l1 6" 
              animate={{ y: [0, 8], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
          </motion.svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z M19 16l2 3m-5-3l4-6 4 6" />
          </svg>
        );
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <motion.h2 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          5-Day Forecast
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {forecast.map((day, index) => (
            <motion.div key={index} variants={item}>
              <Card variant="glass" className="p-6 h-full" animate>
                <div className="flex flex-col h-full">
                  <div className="text-lg font-medium mb-2">{day.date}</div>
                  
                  {/* Weather Icon */}
                  <div className="text-white/80 my-3 flex justify-center">
                    {getWeatherIcon(day.weather.main)}
                  </div>
                  
                  {/* Temperature Range */}
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <div className="text-2xl font-light">{day.temp.max}°</div>
                      <div className="text-white/60">High</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-light text-white/80">{day.temp.min}°</div>
                      <div className="text-white/60">Low</div>
                    </div>
                  </div>
                  
                  {/* Weather Details */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-white/60 text-xs">Humidity</div>
                      <div className="text-sm">{day.humidity}%</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Wind</div>
                      <div className="text-sm">{day.wind_speed} km/h</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div>
        <motion.h2 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          Precipitation Chance
        </motion.h2>
        <Card variant="glass" className="p-6" animate>
          <div className="flex justify-between items-end h-36 mb-2">
            {forecast.map((day, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <motion.div 
                  className="w-12 bg-blue-500/70 rounded-t-lg"
                  style={{ 
                    minHeight: '4px',
                    backgroundColor: day.precipitation > 5 ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.4)'
                  }}
                  initial={{ height: 0 }}
                  animate={{ 
                    height: `${day.precipitation * 8}px`,
                    transition: { delay: 0.5 + index * 0.1, duration: 1, type: 'spring' }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: day.precipitation > 5 ? 'rgba(59, 130, 246, 0.9)' : 'rgba(59, 130, 246, 0.6)'
                  }}
                ></motion.div>
                <div className="text-white/60 text-xs mt-2">{day.date.substring(0,3)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 mt-4">
            <div className="text-white/70 text-sm">Precipitation forecast for the next 5 days</div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Forecast; 