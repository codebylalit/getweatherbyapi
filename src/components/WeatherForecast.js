import React from 'react';
import './WeatherForecast.css';

const WeatherForecast = ({ forecast }) => {
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

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Group forecast by day and get daily averages
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = {
        date: item.dt,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        weather: item.weather[0]
      };
    } else {
      acc[date].tempMin = Math.min(acc[date].tempMin, item.main.temp_min);
      acc[date].tempMax = Math.max(acc[date].tempMax, item.main.temp_max);
    }
    return acc;
  }, {});

  // Get up to 7 days
  const forecastDays = Object.values(dailyForecast).slice(0, 7);

  return (
    <div className="weather-forecast glass hover-lift slide-up" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
      <div className="forecast-row">
        {forecastDays.map((day, index) => (
          <div key={index} className="forecast-day rounded-glass-card">
            <div className="forecast-day-header">
              <div className="forecast-day-name">{getDayName(day.date)}</div>
              <div className="forecast-day-icon">{getWeatherIcon(day.weather.icon)}</div>
            </div>
            <div className="forecast-day-temp">
              <span className="forecast-temp-max">{Math.round(day.tempMax)}&deg;</span>
              <span className="forecast-temp-min">{Math.round(day.tempMin)}&deg;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast; 