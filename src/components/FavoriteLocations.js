import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

function FavoriteLocations({ favorites, currentCity, onFavoriteClick, onRemoveFavorite }) {
  return (
    <motion.div 
      className="favorite-locations"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className="favorites-title">📍 Favorite Locations</h4>
      <div className="favorites-list">
        {favorites.map((city, index) => (
          <motion.div
            key={index}
            className={`favorite-item ${city === currentCity ? 'active' : ''}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <button 
              className="favorite-city-button"
              onClick={() => onFavoriteClick(city)}
            >
              {city}
            </button>
            <button 
              className="remove-favorite"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFavorite(city);
              }}
              title="Remove from favorites"
            >
              <FaTimes />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default FavoriteLocations;