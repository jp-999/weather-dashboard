import React from 'react';
import { useWeather } from '../../../context/WeatherContext';
import { useTheme } from '../../../context/ThemeContext';
import SearchBar from '../../common/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

const Header = () => {
  const { location, changeLocation } = useWeather();
  const { darkMode, toggleTheme } = useTheme();
  
  const handleSearch = (query) => {
    changeLocation(query);
  };
  
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-background-dark/70 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <div className="mr-8">
            <h1 className="text-2xl font-space font-bold gradient-text">
              METEORA
            </h1>
            <p className="text-xs text-white/50">Weather Dashboard</p>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:block w-64">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Current Location */}
          {location && (
            <div className="hidden md:flex items-center">
              <span className="text-white/70 mr-2">Current:</span>
              <span className="font-medium">{location}</span>
            </div>
          )}
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            icon={
              darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )
            }
          />
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
    </header>
  );
};

export default Header; 