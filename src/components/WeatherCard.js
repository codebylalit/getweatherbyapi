import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather, location, forecast }) => {
  const getWeatherIcon = (weatherCode) => {
    const weatherIcons = {
      '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️', '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️', '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️', '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️', '50d': '🌫️', '50n': '🌫️'
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
      hour12: false
    });
  };

  const calculateDayLength = (sunrise, sunset) => {
    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);
    const diffMs = sunsetTime - sunriseTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours} h ${diffMinutes} m`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Forecast grouping for 7 days
  let forecastDays = [];
  if (forecast && forecast.list) {
    console.log('Forecast data received:', forecast);
    const dailyForecast = forecast.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!acc[date]) {
        acc[date] = {
          date: item.dt,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          weather: item.weather[0],
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          pop: item.pop * 100, // Probability of precipitation
        };
      } else {
        acc[date].tempMin = Math.min(acc[date].tempMin, item.main.temp_min);
        acc[date].tempMax = Math.max(acc[date].tempMax, item.main.temp_max);
        acc[date].humidity = Math.round((acc[date].humidity + item.main.humidity) / 2);
        acc[date].windSpeed = Math.round((acc[date].windSpeed + item.wind.speed) / 2);
        acc[date].pop = Math.max(acc[date].pop, item.pop * 100);
      }
      return acc;
    }, {});
    forecastDays = Object.values(dailyForecast).slice(0, 7);
    console.log('Processed forecast days:', forecastDays);
  } else {
    console.log('No forecast data available');
    // Don't create fallback data - just show empty forecast
    forecastDays = [];
  }

  return (
    <div className="weather-card-final">
      <div className="wcf-header">
        <div className="wcf-header-left">
          <div className="wcf-date-time">{formatDate(weather.dt)}</div>
          <div className="wcf-weather-desc">{getWeatherDescription(weather.weather[0].description)} {Math.round(weather.main.temp)}°C</div>
          <div className="wcf-location">{location}</div>
        </div>
        <div className="wcf-header-right">
          <span className="wcf-icon">{getWeatherIcon(weather.weather[0].icon)}</span>
        </div>
      </div>

      {/* Sunrise/Sunset Bar */}
      {weather.sys && (
        <div className="wcf-pill-bar wcf-dark-bar">
          <span className="wcf-pill-icon">🌅</span>
          <span className="wcf-pill-time">{formatTime(weather.sys.sunrise)}</span>
          <span className="wcf-pill-mid">{calculateDayLength(weather.sys.sunrise, weather.sys.sunset)}</span>
          <span className="wcf-pill-time">{formatTime(weather.sys.sunset)}</span>
          <span className="wcf-pill-icon">🌇</span>
        </div>
      )}

      {/* Rain Bar
      {weather.rain && (
        <div className="wcf-pill-bar wcf-dark-bar wcf-rain-bar">
          <span className="wcf-pill-icon">🌧️</span>
          <span className="wcf-pill-label">Rain: {Math.round((weather.rain['1h'] || weather.rain['3h'] || 0) * 100)}%</span>
        </div>
      )}
      {weather.snow && (
        <div className="wcf-pill-bar wcf-dark-bar wcf-rain-bar">
          <span className="wcf-pill-icon">❄️</span>
          <span className="wcf-pill-label">Snow: {Math.round((weather.snow['1h'] || weather.snow['3h'] || 0) * 100)}%</span>
        </div>
      )}
      {!weather.rain && !weather.snow && weather.clouds && weather.clouds.all > 50 && (
        <div className="wcf-pill-bar wcf-dark-bar wcf-rain-bar">
          <span className="wcf-pill-icon">☁️</span>
          <span className="wcf-pill-label">Clouds: {weather.clouds.all}%</span>
        </div>
      )} */}

      {/* Main Temperature */}
      <div className="wcf-temp-main">
        <span className="wcf-temp">{Math.round(weather.main.temp)}°C</span>
        <span className="wcf-minmax">Min: {Math.round(weather.main.temp_min)}° Max: {Math.round(weather.main.temp_max)}°</span>
      </div>

      {/* Stats Row */}
      <div className="wcf-stats-row">
        <span className="wcf-stat">Humidity: {weather.main.humidity}%</span>
        <span className="wcf-stat">Wind: {Math.round(weather.wind.speed)} km/h</span>
        {weather.main.pressure && (
          <span className="wcf-stat">Pressure: {weather.main.pressure} hPa</span>
        )}
      </div>

      {/* 7-Day Forecast Row */}
      {forecastDays.length > 0 ? (
        <div className="wcf-forecast-row">
          {forecastDays.map((day, idx) => {
            const isToday = idx === 0;
            const getDayName = (timestamp) => {
              const date = new Date(timestamp * 1000);
              return date.toLocaleDateString('en-US', { weekday: 'short' });
            };
            return (
              <div key={idx} className={`wcf-forecast-card${isToday ? ' today' : ''}`}>
                <div className="wcf-forecast-day">{isToday ? 'Today' : getDayName(day.date)}</div>
                <div className="wcf-forecast-icon">{getWeatherIcon(day.weather.icon)}</div>
                <div className="wcf-forecast-temp">
                  <span className="wcf-temp-max">{Math.round(day.tempMax)}°</span>
                  <span className="wcf-temp-min">{Math.round(day.tempMin)}°</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="wcf-forecast-row">
          <div style={{ textAlign: 'center', width: '100%', color: '#e0e0e0', fontSize: '0.9rem' }}>
            Forecast data not available
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard; 