import React, { useState } from 'react';
import { getWeatherIcon } from '../utils/weatherBackgrounds';

const AdvancedWeatherCard = ({ weatherData, forecastData, airQualityData }) => {
  const [activeTab, setActiveTab] = useState('hourly');

  // Generate hourly forecast for next 24 hours
  const getHourlyForecast = () => {
    if (!forecastData || !forecastData.list) return [];
    
    return forecastData.list.slice(0, 8).map((item, index) => {
      const date = new Date(item.dt * 1000);
      const hour = date.getHours();
      const isDay = hour >= 6 && hour <= 18;
      
      return {
        time: date.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temp: Math.round(item.main.temp),
        weatherId: item.weather[0].id,
        description: item.weather[0].description,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        isDay
      };
    });
  };

  // Calculate UV index level
  const getUVLevel = (uvIndex) => {
    if (uvIndex <= 2) return { level: 'Low', color: '#4CAF50', risk: 'Low risk of harm' };
    if (uvIndex <= 5) return { level: 'Moderate', color: '#FF9800', risk: 'Moderate risk of harm' };
    if (uvIndex <= 7) return { level: 'High', color: '#FF5722', risk: 'High risk of harm' };
    if (uvIndex <= 10) return { level: 'Very High', color: '#9C27B0', risk: 'Very high risk of harm' };
    return { level: 'Extreme', color: '#F44336', risk: 'Extreme risk of harm' };
  };

  // Get air quality level
  const getAirQualityLevel = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: '#4CAF50', description: 'Air quality is satisfactory' };
    if (aqi <= 100) return { level: 'Moderate', color: '#FF9800', description: 'Air quality is acceptable' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: '#FF5722', description: 'Some pollutants may be a concern' };
    if (aqi <= 200) return { level: 'Unhealthy', color: '#9C27B0', description: 'Everyone may begin to experience health effects' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: '#F44336', description: 'Health warnings of emergency conditions' };
    return { level: 'Hazardous', color: '#8B0000', description: 'Health alert: everyone may experience more serious health effects' };
  };

  const hourlyForecast = getHourlyForecast();
  const uvData = weatherData?.uvi ? getUVLevel(weatherData.uvi) : null;
  const aqData = airQualityData ? getAirQualityLevel(airQualityData.list?.[0]?.main?.aqi || 0) : null;

  return (
    <div className="advanced-weather-card glass hover-lift">
      <div className="advanced-header">
        <h3 className="advanced-title">Advanced Weather Data</h3>
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'hourly' ? 'active' : ''}`}
            onClick={() => setActiveTab('hourly')}
          >
            Hourly
          </button>
          <button 
            className={`tab-button ${activeTab === 'air' ? 'active' : ''}`}
            onClick={() => setActiveTab('air')}
          >
            Air Quality
          </button>
          <button 
            className={`tab-button ${activeTab === 'uv' ? 'active' : ''}`}
            onClick={() => setActiveTab('uv')}
          >
            UV Index
          </button>
        </div>
      </div>

      <div className="advanced-content">
        {activeTab === 'hourly' && (
          <div className="hourly-forecast">
            <div className="hourly-grid">
              {hourlyForecast.map((hour, index) => (
                <div key={index} className="hourly-item glass">
                  <div className="hourly-time">{hour.time}</div>
                  <div className="hourly-icon">
                    {getWeatherIcon(hour.weatherId, hour.isDay)}
                  </div>
                  <div className="hourly-temp">{hour.temp}°C</div>
                  <div className="hourly-details">
                    <div className="hourly-humidity">💧 {hour.humidity}%</div>
                    <div className="hourly-wind">💨 {Math.round(hour.windSpeed)} m/s</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'air' && (
          <div className="air-quality">
            {aqData ? (
              <div className="aq-container">
                <div className="aq-header">
                  <h4>Air Quality Index</h4>
                  <div className="aq-value" style={{ color: aqData.color }}>
                    {airQualityData.list?.[0]?.main?.aqi || 'N/A'}
                  </div>
                </div>
                <div className="aq-level" style={{ color: aqData.color }}>
                  {aqData.level}
                </div>
                <div className="aq-description">
                  {aqData.description}
                </div>
                <div className="aq-components">
                  <div className="aq-component">
                    <span className="component-label">PM2.5:</span>
                    <span className="component-value">
                      {airQualityData.list?.[0]?.components?.pm2_5?.toFixed(1) || 'N/A'} μg/m³
                    </span>
                  </div>
                  <div className="aq-component">
                    <span className="component-label">PM10:</span>
                    <span className="component-value">
                      {airQualityData.list?.[0]?.components?.pm10?.toFixed(1) || 'N/A'} μg/m³
                    </span>
                  </div>
                  <div className="aq-component">
                    <span className="component-label">O₃:</span>
                    <span className="component-value">
                      {airQualityData.list?.[0]?.components?.o3?.toFixed(1) || 'N/A'} μg/m³
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-data">Air quality data not available</div>
            )}
          </div>
        )}

        {activeTab === 'uv' && (
          <div className="uv-index">
            {uvData ? (
              <div className="uv-container">
                <div className="uv-header">
                  <h4>UV Index</h4>
                  <div className="uv-value" style={{ color: uvData.color }}>
                    {weatherData.uvi?.toFixed(1) || 'N/A'}
                  </div>
                </div>
                <div className="uv-level" style={{ color: uvData.color }}>
                  {uvData.level}
                </div>
                <div className="uv-description">
                  {uvData.risk}
                </div>
                <div className="uv-recommendations">
                  <h5>Protection Recommendations:</h5>
                  <ul>
                    {weatherData.uvi <= 2 && (
                      <li>No protection required. You can safely stay outside.</li>
                    )}
                    {weatherData.uvi > 2 && weatherData.uvi <= 5 && (
                      <>
                        <li>Seek shade during midday hours.</li>
                        <li>Wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.</li>
                        <li>Generously apply broad spectrum SPF 30+ sunscreen every 2 hours.</li>
                      </>
                    )}
                    {weatherData.uvi > 5 && (
                      <>
                        <li>Minimize sun exposure during midday hours.</li>
                        <li>Wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.</li>
                        <li>Generously apply broad spectrum SPF 30+ sunscreen every 2 hours.</li>
                        <li>Be extra careful outside, especially during late morning through mid-afternoon.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="no-data">UV index data not available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedWeatherCard; 