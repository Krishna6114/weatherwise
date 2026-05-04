import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import FavoriteLocations from './components/FavoriteLocations';
import WeatherCards from './components/WeatherCards';
import AirQuality from './components/AirQuality';
import { 
  getCurrentWeather, 
  getForecast, 
  getWeatherByCoords, 
  getForecastByCoords,
  getAirQuality 
} from './utils/api';
import { 
  getWeatherBackground, 
  isNightTime,
  loadFavorites,
  saveFavorites,
  loadPreferences,
  savePreferences
} from './utils/helpers';
import './styles/App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [preferences, setPreferences] = useState({ unit: 'celsius', theme: 'auto' });
  const [currentCity, setCurrentCity] = useState('');

  useEffect(() => {
    setFavorites(loadFavorites());
    setPreferences(loadPreferences());
  }, []);

  const getUserLocation = () => {
  setLoading(true);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        fetchWeatherByCity('London');
      }
    );
  } else {
    fetchWeatherByCity('London');
  }
};

useEffect(() => {
  getUserLocation();
}, []);

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      const weatherData = await getCurrentWeather(city);
      const forecastData = await getForecast(city);
      const aqiData = await getAirQuality(weatherData.coord.lat, weatherData.coord.lon);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setAirQuality(aqiData);
      setCurrentCity(city);
      setLoading(false);
    } catch (err) {
      setError('City not found. Please try again.');
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      const weatherData = await getWeatherByCoords(lat, lon);
      const forecastData = await getForecastByCoords(lat, lon);
      const aqiData = await getAirQuality(lat, lon);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setAirQuality(aqiData);
      setCurrentCity(weatherData.name);
      setLoading(false);
    } catch (err) {
      setError('Unable to fetch weather data.');
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    fetchWeatherByCity(city);
  };

  const handleAddFavorite = () => {
    if (currentCity && !favorites.includes(currentCity)) {
      const newFavorites = [...favorites, currentCity];
      if (newFavorites.length > 10) {
        newFavorites.shift();
      }
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    }
  };

  const handleRemoveFavorite = (city) => {
    const newFavorites = favorites.filter(fav => fav !== city);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const handleFavoriteClick = (city) => {
    fetchWeatherByCity(city);
  };

  const toggleUnit = () => {
    const newUnit = preferences.unit === 'celsius' ? 'fahrenheit' : 'celsius';
    const newPreferences = { ...preferences, unit: newUnit };
    setPreferences(newPreferences);
    savePreferences(newPreferences);
  };

  const getBackground = () => {
    if (!currentWeather) return 'linear-gradient(to bottom, #56ccf2, #2f80ed)';
    
    const isNight = isNightTime(
      currentWeather.dt,
      currentWeather.sys.sunrise,
      currentWeather.sys.sunset
    );
    
    return getWeatherBackground(currentWeather.weather[0].id, isNight);
  };

  if (loading && !currentWeather) {
    return (
      <div className="app-container" style={{ background: getBackground() }}>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ background: getBackground() }}>
      <motion.div 
        className="app-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="app-header">
          <h1 className="app-title">🌤️ WeatherWise</h1>
          <button className="unit-toggle" onClick={toggleUnit}>
            °{preferences.unit === 'celsius' ? 'C' : 'F'}
          </button>
        </header>

        <SearchBar onSearch={handleSearch} />

        {error && <div className="error-message">{error}</div>}

        {favorites.length > 0 && (
          <FavoriteLocations
            favorites={favorites}
            currentCity={currentCity}
            onFavoriteClick={handleFavoriteClick}
            onRemoveFavorite={handleRemoveFavorite}
          />
        )}

        {currentWeather && (
          <>
            <CurrentWeather
              weather={currentWeather}
              unit={preferences.unit}
              onAddFavorite={handleAddFavorite}
              isFavorite={favorites.includes(currentCity)}
            />

            <WeatherCards weather={currentWeather} unit={preferences.unit} />

            {airQuality && <AirQuality data={airQuality} />}

            {forecast && <Forecast forecast={forecast} unit={preferences.unit} />}
          </>
        )}

        <footer className="app-footer">
          <p>Made with ❤️ using OpenWeatherMap API</p>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;