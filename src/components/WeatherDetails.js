import React from 'react';
import './WeatherDetails.css';

const WeatherDetails = ({ weather }) => {
  const getPressureStatus = (pressure) => {
    if (pressure < 1000) return 'Low';
    if (pressure > 1020) return 'High';
    return 'Normal';
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getUVIndex = (uvi) => {
    if (uvi <= 2) return { level: 'Low', color: '#4CAF50' };
    if (uvi <= 5) return { level: 'Moderate', color: '#FF9800' };
    if (uvi <= 7) return { level: 'High', color: '#F44336' };
    if (uvi <= 10) return { level: 'Very High', color: '#9C27B0' };
    return { level: 'Extreme', color: '#E91E63' };
  };

  return (
    <div className="weather-details glass hover-lift slide-up">
      <h3 className="details-title">Weather Details</h3>
      
      <div className="details-grid">
        <div className="detail-item">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weather.main.pressure} hPa</span>
            <span className="detail-status">{getPressureStatus(weather.main.pressure)}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <span className="detail-label">Wind Direction</span>
            <span className="detail-value">{getWindDirection(weather.wind.deg)}</span>
            <span className="detail-status">{weather.wind.deg}°</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌊</div>
          <div className="detail-content">
            <span className="detail-label">Sea Level</span>
            <span className="detail-value">{weather.main.sea_level || 'N/A'} hPa</span>
            <span className="detail-status">Atmospheric</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🏔️</div>
          <div className="detail-content">
            <span className="detail-label">Ground Level</span>
            <span className="detail-value">{weather.main.grnd_level || 'N/A'} hPa</span>
            <span className="detail-status">Surface</span>
          </div>
        </div>

        {weather.rain && (
          <div className="detail-item">
            <div className="detail-icon">🌧️</div>
            <div className="detail-content">
              <span className="detail-label">Rain (1h)</span>
              <span className="detail-value">{weather.rain['1h'] || 0} mm</span>
              <span className="detail-status">Last Hour</span>
            </div>
          </div>
        )}

        {weather.snow && (
          <div className="detail-item">
            <div className="detail-icon">❄️</div>
            <div className="detail-content">
              <span className="detail-label">Snow (1h)</span>
              <span className="detail-value">{weather.snow['1h'] || 0} mm</span>
              <span className="detail-status">Last Hour</span>
            </div>
          </div>
        )}

        <div className="detail-item">
          <div className="detail-icon">☁️</div>
          <div className="detail-content">
            <span className="detail-label">Cloud Cover</span>
            <span className="detail-value">{weather.clouds.all}%</span>
            <span className="detail-status">
              {weather.clouds.all < 25 ? 'Clear' : 
               weather.clouds.all < 50 ? 'Partly Cloudy' : 
               weather.clouds.all < 75 ? 'Mostly Cloudy' : 'Overcast'}
            </span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌅</div>
          <div className="detail-content">
            <span className="detail-label">Sunrise</span>
            <span className="detail-value">
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </span>
            <span className="detail-status">Today</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌇</div>
          <div className="detail-content">
            <span className="detail-label">Sunset</span>
            <span className="detail-value">
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </span>
            <span className="detail-status">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails; 