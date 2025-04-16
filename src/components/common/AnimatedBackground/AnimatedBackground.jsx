import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../../../context/WeatherContext';

const AnimatedBackground = () => {
  const { currentWeather } = useWeather();
  const [particles, setParticles] = useState([]);
  const [weatherType, setWeatherType] = useState('clear');
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    if (!currentWeather) return;

    // Determine if it's night based on the icon
    const nightCheck = currentWeather.weather?.icon?.includes('n') || false;
    setIsNight(nightCheck);

    // Set weather type based on current weather
    const condition = currentWeather.weather?.main?.toLowerCase() || 'clear';
    setWeatherType(condition);

    // Generate particles based on weather type
    generateParticles(condition, nightCheck);

    // Regenerate particles occasionally to prevent UI from becoming stale
    const interval = setInterval(() => {
      generateParticles(condition, nightCheck);
    }, 30000); // Regenerate every 30 seconds

    return () => clearInterval(interval);
  }, [currentWeather]);

  const generateParticles = (condition, isNightTime) => {
    const newParticles = [];
    let particleCount;
    
    switch (condition) {
      case 'clear':
        // Generate sun rays or stars
        particleCount = isNightTime ? 50 : 15;
        for (let i = 0; i < particleCount; i++) {
          newParticles.push({
            id: `clear-${i}-${Date.now()}`,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: isNightTime ? Math.random() * 3 + 1 : Math.random() * 80 + 40,
            duration: Math.random() * 10 + 5,
            delay: Math.random() * 5,
            opacity: isNightTime ? Math.random() * 0.7 + 0.3 : Math.random() * 0.3 + 0.1,
          });
        }
        break;
      
      case 'clouds':
        // Generate clouds
        for (let i = 0; i < 8; i++) {
          newParticles.push({
            id: `cloud-${i}-${Date.now()}`,
            x: Math.random() * 120 - 10,
            y: Math.random() * 60,
            size: Math.random() * 150 + 100,
            duration: Math.random() * 200 + 100,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.2 + 0.1,
          });
        }
        break;
      
      case 'rain':
      case 'drizzle':
        // Generate raindrops
        for (let i = 0; i < 80; i++) {
          newParticles.push({
            id: `rain-${i}-${Date.now()}`,
            x: Math.random() * 100,
            y: Math.random() * 20, // Start near the top
            size: Math.random() * 3 + 1,
            duration: Math.random() * 1 + 0.5,
            delay: Math.random() * 2,
            opacity: Math.random() * 0.4 + 0.3,
          });
        }
        break;
      
      case 'snow':
        // Generate snowflakes
        for (let i = 0; i < 60; i++) {
          newParticles.push({
            id: `snow-${i}-${Date.now()}`,
            x: Math.random() * 100,
            y: Math.random() * 20, // Start near the top
            size: Math.random() * 5 + 2,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            opacity: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360,
          });
        }
        break;
      
      case 'thunderstorm':
        // Generate lightning bolts and raindrops
        for (let i = 0; i < 60; i++) {
          newParticles.push({
            id: `thunder-rain-${i}-${Date.now()}`,
            x: Math.random() * 100,
            y: Math.random() * 20, // Start near the top
            size: Math.random() * 3 + 1,
            duration: Math.random() * 1 + 0.5,
            delay: Math.random() * 2,
            opacity: Math.random() * 0.4 + 0.3,
          });
        }
        // Add a few lightning bolts
        for (let i = 0; i < 3; i++) {
          newParticles.push({
            id: `lightning-${i}-${Date.now()}`,
            x: Math.random() * 80 + 10,
            y: Math.random() * 20,
            size: Math.random() * 100 + 100,
            duration: 0.5,
            delay: Math.random() * 8 + 2,
            opacity: 0.7,
            isLightning: true,
          });
        }
        break;
        
      default:
        // Default particles for other weather types
        for (let i = 0; i < 20; i++) {
          newParticles.push({
            id: `default-${i}-${Date.now()}`,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 10 + 5,
            duration: Math.random() * 10 + 5,
            delay: Math.random() * 5,
            opacity: Math.random() * 0.3 + 0.2,
          });
        }
    }
    
    setParticles(newParticles);
  };

  const renderParticles = () => {
    return particles.map((particle) => {
      // Specific particle renderings based on weather type
      if (weatherType === 'clear' && !isNight) {
        // Sun rays
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-yellow-300"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [particle.opacity, particle.opacity + 0.2, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: particle.delay,
            }}
          />
        );
      } else if (weatherType === 'clear' && isNight) {
        // Stars
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [particle.opacity, particle.opacity + 0.3, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: particle.delay,
            }}
          />
        );
      } else if (weatherType === 'clouds') {
        // Clouds
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `-20%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size * 0.6}px`,
              opacity: particle.opacity,
              filter: 'blur(20px)',
            }}
            animate={{
              x: ['0%', '120%'],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'loop',
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        );
      } else if (weatherType === 'rain' || weatherType === 'drizzle') {
        // Rain
        return (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-200"
            style={{
              left: `${particle.x}%`,
              top: `-5%`,
              width: '1px',
              height: `${particle.size * 5}px`,
              opacity: particle.opacity,
            }}
            animate={{
              y: ['0%', '105%'],
              opacity: [particle.opacity, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        );
      } else if (weatherType === 'snow') {
        // Snow
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `-5%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            animate={{
              y: ['0%', '105%'],
              x: [
                '0%',
                `${Math.sin(particle.id) * 10}%`,
                '0%',
                `${-Math.sin(particle.id) * 10}%`,
                '0%'
              ],
              rotate: [0, particle.rotate],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        );
      } else if (weatherType === 'thunderstorm') {
        // Thunder effect
        if (particle.isLightning) {
          return (
            <motion.div
              key={particle.id}
              className="absolute bg-yellow-100"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: '3px',
                height: `${particle.size}px`,
                opacity: 0,
                filter: 'blur(3px)',
                zIndex: 10,
                transform: 'rotate(10deg)',
              }}
              animate={{
                opacity: [0, particle.opacity, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                repeatDelay: Math.random() * 10 + 5,
              }}
            />
          );
        } else {
          // Rain for thunderstorm
          return (
            <motion.div
              key={particle.id}
              className="absolute bg-blue-200"
              style={{
                left: `${particle.x}%`,
                top: `-5%`,
                width: '1px',
                height: `${particle.size * 5}px`,
                opacity: particle.opacity,
              }}
              animate={{
                y: ['0%', '105%'],
                opacity: [particle.opacity, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'linear',
              }}
            />
          );
        }
      } else {
        // Default particles
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: particle.delay,
            }}
          />
        );
      }
    });
  };

  const getBackgroundClass = () => {
    if (isNight) {
      return 'bg-gradient-to-b from-indigo-900 via-blue-900 to-blue-800';
    }

    switch (weatherType) {
      case 'clear':
        return 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600';
      case 'clouds':
        return 'bg-gradient-to-b from-gray-400 via-blue-400 to-blue-500';
      case 'rain':
      case 'drizzle':
        return 'bg-gradient-to-b from-gray-600 via-blue-700 to-blue-800';
      case 'snow':
        return 'bg-gradient-to-b from-gray-300 via-blue-200 to-indigo-300';
      case 'thunderstorm':
        return 'bg-gradient-to-b from-gray-800 via-indigo-900 to-purple-900';
      default:
        return 'bg-gradient-to-b from-background-dark to-background';
    }
  };

  return (
    <div className={`fixed inset-0 ${getBackgroundClass()} -z-10 overflow-hidden`}>
      {renderParticles()}
    </div>
  );
};

export default AnimatedBackground; 