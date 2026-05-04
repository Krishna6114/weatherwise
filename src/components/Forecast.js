import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatTemperature, getWeatherIcon } from '../utils/helpers';

function Forecast({ forecast, unit }) {
  const [viewMode, setViewMode] = useState('daily');

  const getHourlyForecast = () => {
    return forecast.list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
        hour: 'numeric',
        hour12: true 
      }),
      temp: item.main.temp,
      icon: getWeatherIcon(item.weather[0].id),
      description: item.weather[0].description
    }));
  };

  const getDailyForecast = () => {
    const dailyData = {};
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          icon: item.weather[0].id,
          description: item.weather[0].description,
          date: new Date(item.dt * 1000)
        };
      }
      dailyData[date].temps.push(item.main.temp);
    });

    return Object.values(dailyData).slice(0, 7).map(day => ({
      day: day.date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      high: Math.max(...day.temps),
      low: Math.min(...day.temps),
      icon: getWeatherIcon(day.icon),
      description: day.description
    }));
  };

  const hourlyData = getHourlyForecast();
  const dailyData = getDailyForecast();

  return (
    <motion.div 
      className="forecast-container"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="forecast-header">
        <h3>Weather Forecast</h3>
        <div className="forecast-toggle">
          <button 
            className={viewMode === 'hourly' ? 'active' : ''}
            onClick={() => setViewMode('hourly')}
          >
            Hourly
          </button>
          <button 
            className={viewMode === 'daily' ? 'active' : ''}
            onClick={() => setViewMode('daily')}
          >
            Daily
          </button>
        </div>
      </div>

      {viewMode === 'hourly' ? (
        <div className="hourly-forecast">
          {hourlyData.map((hour, index) => (
            <motion.div 
              key={index}
              className="hourly-item"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="hour-time">{hour.time}</p>
              <span className="hour-icon">{hour.icon}</span>
              <p className="hour-temp">{formatTemperature(hour.temp, unit)}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="daily-forecast">
          {dailyData.map((day, index) => (
            <motion.div 
              key={index}
              className="daily-item"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="daily-day">
                <p className="day-name">{day.day}</p>
                <p className="day-date">{day.date}</p>
              </div>
              <span className="daily-icon">{day.icon}</span>
              <div className="daily-temps">
                <span className="temp-high">{formatTemperature(day.high, unit)}</span>
                <span className="temp-divider">/</span>
                <span className="temp-low">{formatTemperature(day.low, unit)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Forecast;