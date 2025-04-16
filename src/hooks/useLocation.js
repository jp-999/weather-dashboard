import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLocation = () => {
      setLoading(true);
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          setError('Unable to retrieve your location');
          setLoading(false);
          console.error('Geolocation error:', err);
        }
      );
    };

    getUserLocation();
  }, []);

  // Function to get city name from coordinates (would use reverse geocoding API in a real app)
  const getCityFromCoordinates = () => {
    // In a real app, we would make an API call to a geocoding service
    // For now, we'll return a mock result
    return { city: 'London', country: 'UK' };
  };

  return { location, error, loading, getCityFromCoordinates };
};

export default useLocation; 