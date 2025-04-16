import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';
import SearchBar from '../../common/SearchBar/SearchBar';
import { useWeather } from '../../../context/WeatherContext';
import useLocation from '../../../hooks/useLocation';

// Popular cities
const popularCities = [
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

const LocationSelector = () => {
  const { changeLocation, location, favorites, toggleFavorite } = useWeather();
  const { location: userLocation, loading: locationLoading, getCityFromCoordinates } = useLocation();
  const [showPopularCities, setShowPopularCities] = useState(false);
  
  const handleSearch = (query) => {
    changeLocation(query);
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite(location);
  };
  
  const handleUseCurrentLocation = async () => {
    if (userLocation) {
      // In a real app, we would do a reverse geocode lookup
      // to get the city name based on coordinates
      const result = getCityFromCoordinates();
      if (result) {
        changeLocation(result.city);
      }
    }
  };
  
  const isFavorite = favorites.includes(location);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Change Location</h2>
        <Card variant="glass" className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-grow w-full">
              <SearchBar onSearch={handleSearch} placeholder="Search for a city..." />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button 
                variant="secondary" 
                onClick={handleUseCurrentLocation}
                disabled={locationLoading || !userLocation}
                className="flex-grow md:flex-grow-0"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              >
                Use My Location
              </Button>
              <Button 
                variant={isFavorite ? 'primary' : 'outline'} 
                onClick={handleToggleFavorite}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.519 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                }
              />
            </div>
          </div>
        </Card>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Cities</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowPopularCities(!showPopularCities)}
          >
            {showPopularCities ? 'Show Less' : 'Show All'}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {popularCities.slice(0, showPopularCities ? undefined : 8).map((city, index) => (
            <motion.div 
              key={city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card 
                variant="flat" 
                className="p-4 h-full cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => changeLocation(city)}
              >
                <div className="flex flex-col h-full">
                  <div className="text-lg font-medium">{city}</div>
                  <div className="mt-auto pt-2 text-white/60 text-sm">
                    Click to select
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector; 