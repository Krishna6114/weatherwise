import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { 
  formatTemperature, 
  getWeatherIcon, 
  formatTime,
  getOutfitRecommendation,
  getActivitySuggestion 
} from '../utils/helpers';

function CurrentWeather({ weather, unit, onAddFavorite, isFavorite }) {
  const temp = weather.main.temp;
  const feelsLike = weather.main.feels_like;
  const description = weather.weather[0].description;
  const icon = getWeatherIcon(weather.weather[0].id);
  const sunrise = formatTime(weather.sys.sunrise, weather.timezone);
  const sunset = formatTime(weather.sys.sunset, weather.timezone);

  return (
    <motion.div 
      className="current-weather"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="current-weather-header">
        <div>
          <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
          <p className="weather-date">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
        <button 
          className="favorite-button" 
          onClick={onAddFavorite}
          title={isFavorite ? "Already in favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaStar /> : <FaRegStar />}
        </button>
      </div>

      <div className="current-weather-main">
        <div className="weather-icon-large">
          <span>{icon}</span>
        </div>
        <div className="temperature-display">
          <h1 className="temperature">{formatTemperature(temp, unit)}</h1>
          <p className="weather-description">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
          <p className="feels-like">Feels like {formatTemperature(feelsLike, unit)}</p>
        </div>
      </div>

      <div className="weather-details-grid">
        <div className="weather-detail">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.main.humidity}%</span>
        </div>
        <div className="weather-detail">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{weather.wind.speed} m/s</span>
        </div>
        <div className="weather-detail">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weather.main.pressure} hPa</span>
        </div>
        <div className="weather-detail">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>

      <div className="sun-times">
        <div className="sun-time">
          <span>🌅 Sunrise</span>
          <span>{sunrise}</span>
        </div>
        <div className="sun-time">
          <span>🌇 Sunset</span>
          <span>{sunset}</span>
        </div>
      </div>

      <div className="recommendations">
        <div className="recommendation-card">
          <h4>👕 What to Wear</h4>
          <p>{getOutfitRecommendation(temp, weather.weather[0].id)}</p>
        </div>
        <div className="recommendation-card">
          <h4>🎯 Activity Suggestion</h4>
          <p>{getActivitySuggestion(temp, weather.weather[0].id)}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default CurrentWeather;