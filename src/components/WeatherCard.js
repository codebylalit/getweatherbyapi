import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather, location }) => {
  const getWeatherIcon = (weatherCode) => {
    const weatherIcons = {
      '01d': '☀️',
      '01n': '🌙',
      '02d': '⛅',
      '02n': '☁️',
      '03d': '☁️',
      '03n': '☁️',
      '04d': '☁️',
      '04n': '☁️',
      '09d': '🌧️',
      '09n': '🌧️',
      '10d': '🌦️',
      '10n': '🌧️',
      '11d': '⛈️',
      '11n': '⛈️',
      '13d': '❄️',
      '13n': '❄️',
      '50d': '🌫️',
      '50n': '🌫️'
    };
    return weatherIcons[weatherCode] || '🌤️';
  };

  const getWeatherDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="weather-card glass hover-lift fade-in">
      <div className="weather-card-header">
        <div className="location-info">
          <h2 className="location-name">{location}</h2>
          <p className="location-date">{formatDate(weather.dt)}</p>
          <p className="location-time">{formatTime(weather.dt)}</p>
        </div>
        <div className="weather-icon-large">
          {getWeatherIcon(weather.weather[0].icon)}
        </div>
      </div>

      <div className="weather-card-body">
        <div className="temperature-section">
          <div className="current-temp">
            <span className="temp-value">{Math.round(weather.main.temp)}</span>
            <span className="temp-unit">°C</span>
          </div>
          <div className="temp-range">
            <span className="temp-min">Min: {Math.round(weather.main.temp_min)}°</span>
            <span className="temp-max">Max: {Math.round(weather.main.temp_max)}°</span>
          </div>
        </div>

        <div className="weather-description">
          <h3 className="description-text">
            {getWeatherDescription(weather.weather[0].description)}
          </h3>
        </div>

        <div className="weather-stats">
          <div className="stat-item">
            <div className="stat-icon">💨</div>
            <div className="stat-content">
              <span className="stat-label">Wind</span>
              <span className="stat-value">{Math.round(weather.wind.speed)} m/s</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">💧</div>
            <div className="stat-content">
              <span className="stat-label">Humidity</span>
              <span className="stat-value">{weather.main.humidity}%</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">👁️</div>
            <div className="stat-content">
              <span className="stat-label">Visibility</span>
              <span className="stat-value">{(weather.visibility / 1000).toFixed(1)} km</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">🌡️</div>
            <div className="stat-content">
              <span className="stat-label">Feels Like</span>
              <span className="stat-value">{Math.round(weather.main.feels_like)}°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 