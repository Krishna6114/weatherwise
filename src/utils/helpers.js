// Convert Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

// Convert Fahrenheit to Celsius
export const fahrenheitToCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5/9;
};

// Format temperature based on unit
export const formatTemperature = (temp, unit) => {
  if (unit === 'fahrenheit') {
    return `${Math.round(celsiusToFahrenheit(temp))}°F`;
  }
  return `${Math.round(temp)}°C`;
};

// Get weather icon based on condition code
export const getWeatherIcon = (code) => {
  if (code >= 200 && code < 300) return '⛈️';
  if (code >= 300 && code < 400) return '🌦️';
  if (code >= 500 && code < 600) return '🌧️';
  if (code >= 600 && code < 700) return '🌨️';
  if (code >= 700 && code < 800) return '🌫️';
  if (code === 800) return '☀️';
  if (code > 800) return '☁️';
  return '🌈';
};

// Get background gradient based on weather
export const getWeatherBackground = (code, isNight) => {
  if (isNight) {
    return 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)';
  }
  
  if (code >= 200 && code < 300) {
    return 'linear-gradient(to bottom, #283048, #859398)';
  }
  if (code >= 500 && code < 600) {
    return 'linear-gradient(to bottom, #4b6cb7, #182848)';
  }
  if (code >= 600 && code < 700) {
    return 'linear-gradient(to bottom, #e6dada, #274046)';
  }
  if (code === 800) {
    return 'linear-gradient(to bottom, #56ccf2, #2f80ed)';
  }
  if (code > 800) {
    return 'linear-gradient(to bottom, #bdc3c7, #2c3e50)';
  }
  
  return 'linear-gradient(to bottom, #56ccf2, #2f80ed)';
};

// Format time from Unix timestamp
export const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Check if it's night time
export const isNightTime = (currentTime, sunrise, sunset) => {
  return currentTime < sunrise || currentTime > sunset;
};

// Get AQI level description
export const getAQILevel = (aqi) => {
  if (aqi === 1) return { level: 'Good', color: '#00e400' };
  if (aqi === 2) return { level: 'Fair', color: '#ffff00' };
  if (aqi === 3) return { level: 'Moderate', color: '#ff7e00' };
  if (aqi === 4) return { level: 'Poor', color: '#ff0000' };
  if (aqi === 5) return { level: 'Very Poor', color: '#8f3f97' };
  return { level: 'Unknown', color: '#808080' };
};

// Get outfit recommendation
export const getOutfitRecommendation = (temp, weatherCode) => {
  if (temp < 10) {
    return '🧥 Heavy jacket, scarf, and gloves recommended';
  } else if (temp < 18) {
    return '🧥 Light jacket or sweater recommended';
  } else if (temp < 25) {
    return '👕 Comfortable light clothing';
  } else {
    return '👕 Light, breathable clothing recommended';
  }
};

// Get activity suggestion
export const getActivitySuggestion = (temp, weatherCode) => {
  if (weatherCode >= 200 && weatherCode < 600) {
    return '🏠 Indoor activities recommended - Rain/storms expected';
  } else if (temp < 5) {
    return '❄️ Bundle up for outdoor activities or stay cozy indoors';
  } else if (temp > 30) {
    return '🌡️ Stay hydrated, seek shade for outdoor activities';
  } else if (weatherCode === 800) {
    return '🌞 Perfect weather for outdoor activities!';
  }
  return '🚶 Good day for a walk or outdoor exercise';
};

// Format wind direction
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Save favorites to localStorage
export const saveFavorites = (favorites) => {
  localStorage.setItem('weatherwise_favorites', JSON.stringify(favorites));
};

// Load favorites from localStorage
export const loadFavorites = () => {
  const saved = localStorage.getItem('weatherwise_favorites');
  return saved ? JSON.parse(saved) : [];
};

// Save user preferences
export const savePreferences = (preferences) => {
  localStorage.setItem('weatherwise_preferences', JSON.stringify(preferences));
};

// Load user preferences
export const loadPreferences = () => {
  const saved = localStorage.getItem('weatherwise_preferences');
  return saved ? JSON.parse(saved) : { unit: 'celsius', theme: 'auto' };
};