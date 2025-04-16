import React from 'react';
import { NavLink } from 'react-router-dom';
import { useWeather } from '../../../context/WeatherContext';

const Sidebar = () => {
  const { favorites, recentLocations, changeLocation } = useWeather();
  
  // Navigation items
  const navItems = [
    { name: 'Current', path: '/', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    )},
    { name: 'Forecast', path: '/forecast', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { name: 'Charts', path: '/charts', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { name: 'Map', path: '/map', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )}
  ];
  
  return (
    <aside className="hidden md:flex flex-col bg-background/30 backdrop-blur-sm border-r border-white/10 w-64 h-[calc(100vh-72px)] sticky top-[72px] overflow-auto">
      {/* Navigation */}
      <nav className="p-4">
        <h2 className="text-white/50 text-xs uppercase tracking-wider mb-2">Navigation</h2>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-lg transition-colors 
                  ${isActive 
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Favorite Locations */}
      <div className="p-4 border-t border-white/10">
        <h2 className="text-white/50 text-xs uppercase tracking-wider mb-2">Favorite Locations</h2>
        {favorites && favorites.length > 0 ? (
          <ul className="space-y-1">
            {favorites.map((city) => (
              <li key={city}>
                <button
                  onClick={() => changeLocation(city)}
                  className="w-full text-left flex items-center px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.519 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {city}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/40 text-sm px-4">No favorite locations yet.</p>
        )}
      </div>
      
      {/* Recent Locations */}
      <div className="p-4 border-t border-white/10">
        <h2 className="text-white/50 text-xs uppercase tracking-wider mb-2">Recent Locations</h2>
        {recentLocations && recentLocations.length > 0 ? (
          <ul className="space-y-1">
            {recentLocations.map((city) => (
              <li key={city}>
                <button
                  onClick={() => changeLocation(city)}
                  className="w-full text-left flex items-center px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {city}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/40 text-sm px-4">No recent locations.</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; 