import React from 'react';
import { motion } from 'framer-motion';
import { getAQILevel } from '../utils/helpers';

function AirQuality({ data }) {
  if (!data || !data.list || data.list.length === 0) {
    return null;
  }

  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;
  const aqiInfo = getAQILevel(aqi);

  const pollutants = [
    { name: 'PM2.5', value: components.pm2_5.toFixed(2), unit: 'μg/m³', description: 'Fine particles' },
    { name: 'PM10', value: components.pm10.toFixed(2), unit: 'μg/m³', description: 'Coarse particles' },
    { name: 'O₃', value: components.o3.toFixed(2), unit: 'μg/m³', description: 'Ozone' },
    { name: 'NO₂', value: components.no2.toFixed(2), unit: 'μg/m³', description: 'Nitrogen dioxide' },
    { name: 'SO₂', value: components.so2.toFixed(2), unit: 'μg/m³', description: 'Sulfur dioxide' },
    { name: 'CO', value: (components.co / 1000).toFixed(2), unit: 'mg/m³', description: 'Carbon monoxide' }
  ];

  const getHealthAdvice = (aqi) => {
    switch(aqi) {
      case 1:
        return '😊 Air quality is excellent. Perfect for outdoor activities!';
      case 2:
        return '🙂 Air quality is acceptable. Enjoy your outdoor activities!';
      case 3:
        return '😐 Moderate air quality. Sensitive individuals should consider limiting prolonged outdoor exertion.';
      case 4:
        return '😷 Poor air quality. Everyone should limit prolonged outdoor exertion.';
      case 5:
        return '⚠️ Very poor air quality. Avoid outdoor activities.';
      default:
        return 'Air quality information unavailable.';
    }
  };

  return (
    <motion.div 
      className="air-quality-container"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3>Air Quality Index</h3>
      
      <div className="aqi-main">
        <div 
          className="aqi-circle"
          style={{ borderColor: aqiInfo.color }}
        >
          <span className="aqi-number">{aqi}</span>
          <span className="aqi-label" style={{ color: aqiInfo.color }}>
            {aqiInfo.level}
          </span>
        </div>
        <div className="aqi-advice">
          <p>{getHealthAdvice(aqi)}</p>
        </div>
      </div>

      <div className="pollutants-grid">
        {pollutants.map((pollutant, index) => (
          <motion.div
            key={index}
            className="pollutant-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <h5>{pollutant.name}</h5>
            <p className="pollutant-value">{pollutant.value} <span>{pollutant.unit}</span></p>
            <p className="pollutant-description">{pollutant.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default AirQuality;