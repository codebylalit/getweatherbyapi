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
        temp: [],
        humidity: [],
        weather: item.weather[0],
        wind: []
      };
    }
    
    acc[date].temp.push(item.main.temp);
    acc[date].humidity.push(item.main.humidity);
    acc[date].wind.push(item.wind.speed);
    
    return acc;
  }, {});

  const forecastDays = Object.values(dailyForecast).slice(0, 5);

  return (
    <div className="weather-forecast glass hover-lift slide-up">
      <h3 className="forecast-title">5-Day Forecast</h3>
      
      <div className="forecast-container">
        {forecastDays.map((day, index) => {
          const avgTemp = Math.round(day.temp.reduce((a, b) => a + b, 0) / day.temp.length);
          const avgHumidity = Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length);
          const avgWind = (day.wind.reduce((a, b) => a + b, 0) / day.wind.length).toFixed(1);
          
          return (
            <div key={index} className="forecast-day">
              <div className="day-header">
                <div className="day-info">
                  <span className="day-name">{getDayName(day.date)}</span>
                  <span className="day-date">{getDate(day.date)}</span>
                </div>
                <div className="day-icon">
                  {getWeatherIcon(day.weather.icon)}
                </div>
              </div>
              
              <div className="day-temp">
                <span className="temp-value">{avgTemp}°</span>
              </div>
              
              <div className="day-description">
                {day.weather.description.charAt(0).toUpperCase() + day.weather.description.slice(1)}
              </div>
              
              <div className="day-stats">
                <div className="day-stat">
                  <span className="stat-icon">💧</span>
                  <span className="stat-value">{avgHumidity}%</span>
                </div>
                <div className="day-stat">
                  <span className="stat-icon">💨</span>
                  <span className="stat-value">{avgWind} m/s</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast; 