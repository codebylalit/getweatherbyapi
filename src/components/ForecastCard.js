import React from 'react';
import { getWeatherIcon } from '../utils/weatherBackgrounds';

const ForecastCard = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;
  return (
    <div className="forecast-card glass hover-lift">
      <div className="forecast-header">
        <h3 className="forecast-title">Hourly Forecast</h3>
        <div className="forecast-subtitle">Next 24 hours</div>
      </div>
      <div className="forecast-grid">
        {forecastData.list.slice(0, 8).map((hour, index) => {
          const date = new Date(hour.dt * 1000);
          const time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
          const isDay = date.getHours() >= 6 && date.getHours() <= 18;
          return (
            <div key={index} className="forecast-day glass">
              <div className="forecast-day-header">
                <div className="forecast-time">{time}</div>
                <div className="forecast-icon">{getWeatherIcon(hour.weather[0].id, isDay)}</div>
              </div>
              <div className="forecast-temp">
                <div className="forecast-temp-main">{Math.round(hour.main.temp)}&deg;C</div>
                <div className="forecast-temp-feels">Feels like {Math.round(hour.main.feels_like)}&deg;C</div>
              </div>
              <div className="forecast-details">
                <div className="forecast-description">{hour.weather[0].description}</div>
                <div className="forecast-stats">
                  <div className="forecast-stat">
                    <span className="stat-icon">💨</span>
                    <span className="stat-value">{Math.round(hour.wind.speed)} m/s</span>
                  </div>
                  <div className="forecast-stat">
                    <span className="stat-icon">💧</span>
                    <span className="stat-value">{Math.round(hour.main.humidity)}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard; 