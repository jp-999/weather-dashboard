import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';
import Header from './components/layout/Header/Header';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Footer from './components/layout/Footer/Footer';
import CurrentWeather from './components/weather/CurrentWeather/CurrentWeather';
import Forecast from './components/weather/Forecast/Forecast';
import WeatherChart from './components/weather/WeatherChart/WeatherChart';
import LocationSelector from './components/weather/LocationSelector/LocationSelector';
import AnimatedBackground from './components/common/AnimatedBackground/AnimatedBackground';
import './styles/global.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <WeatherProvider>
          <div className="flex flex-col min-h-screen relative">
            <AnimatedBackground />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="z-10 relative"
            >
              <Header />
              
              <div className="flex-grow flex">
                <Sidebar />
                
                <main className="flex-1 py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<CurrentWeather />} />
                      <Route path="/forecast" element={<Forecast />} />
                      <Route path="/charts" element={<WeatherChart />} />
                      <Route path="/map" element={<LocationSelector />} />
                    </Routes>
                  </AnimatePresence>
                </main>
              </div>
              
              <Footer />
            </motion.div>
          </div>
        </WeatherProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
