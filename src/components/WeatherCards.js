import React from 'react';
import { motion } from 'framer-motion';
import { FaWind, FaCompress, FaEye, FaTint } from 'react-icons/fa';
import { getWindDirection } from '../utils/helpers';

function WeatherCards({ weather, unit }) {
  const cards = [
    {
      icon: <FaWind />,
      title: 'Wind',
      value: `${weather.wind.speed} m/s`,
      subtitle: `Direction: ${getWindDirection(weather.wind.deg)} (${weather.wind.deg}°)`,
      color: '#3498db'
    },
    {
      icon: <FaCompress />,
      title: 'Pressure',
      value: `${weather.main.pressure} hPa`,
      subtitle: weather.main.pressure > 1013 ? 'High pressure' : 'Low pressure',
      color: '#9b59b6'
    },
    {
      icon: <FaEye />,
      title: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      subtitle: weather.visibility >= 10000 ? 'Excellent' : weather.visibility >= 5000 ? 'Good' : 'Moderate',
      color: '#1abc9c'
    },
    {
      icon: <FaTint />,
      title: 'Humidity',
      value: `${weather.main.humidity}%`,
      subtitle: weather.main.humidity > 70 ? 'High' : weather.main.humidity > 40 ? 'Comfortable' : 'Low',
      color: '#e74c3c'
    }
  ];

  return (
    <div className="weather-cards">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="weather-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          style={{ borderTopColor: card.color }}
        >
          <div className="card-icon" style={{ color: card.color }}>
            {card.icon}
          </div>
          <div className="card-content">
            <h4 className="card-title">{card.title}</h4>
            <p className="card-value">{card.value}</p>
            <p className="card-subtitle">{card.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default WeatherCards;