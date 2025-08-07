import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { getWeatherBackground } from "./utils/weatherBackgrounds";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [backgroundStyle, setBackgroundStyle] = useState({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overlay: 'rgba(0, 0, 0, 0.3)'
  });

  const API_KEY = "117b3d6963142e46c13a0ef2ab4bb41d";
  const BASE_URL = "https://api.openweathermap.org/data/2.5";

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather with additional parameters
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found. Please try again.");
      }

      const weather = await weatherResponse.json();

      // Fetch 7-day forecast with additional parameters
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`
      );

      if (forecastResponse.ok) {
        const forecast = await forecastResponse.json();
        setForecastData(forecast);
      } else {
        console.warn('Forecast data not available');
        setForecastData(null);
      }

      setWeatherData(weather);
      setCurrentLocation(city);
      
      // Update background based on weather
      const newBackground = getWeatherBackground(weather);
      setBackgroundStyle(newBackground);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Fetch current weather with additional parameters
            const weatherResponse = await fetch(
              `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=en`
            );
            const weatherData = await weatherResponse.json();
            
            // Fetch 7-day forecast with additional parameters
            const forecastResponse = await fetch(
              `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=en`
            );
            if (forecastResponse.ok) {
              const forecast = await forecastResponse.json();
              setForecastData(forecast);
            } else {
              console.warn('Forecast data not available for location');
              setForecastData(null);
            }

            setWeatherData(weatherData);
            setCurrentLocation(weatherData.name);
            
            // Update background based on weather
            const newBackground = getWeatherBackground(weatherData);
            setBackgroundStyle(newBackground);
          } catch (err) {
            setError("Unable to get weather for your location.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Unable to get your location. Please search for a city.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    // Set default city on app load
    fetchWeatherData("London");
  }, []);

  return (
    <>
      <style>
        {`
          body {
            background: ${backgroundStyle.background} !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            background-attachment: fixed !important;
            margin: 0 !important;
            padding: 0 !important;
            min-height: 100vh !important;
            width: 100% !important;
          }
        `}
      </style>
      <div className="App" style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        background: backgroundStyle.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        <div className="background-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: backgroundStyle.overlay,
          zIndex: 1
        }}></div>
        <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="content-wrapper">
        <main className="app-main">
          <div className="dashboard-layout">
            <div className="sidebar">
              <div className="sidebar-header">
                <h1 className="app-title">
                  <span className="weather-icon">🌤️</span>
                  WeatherFlow
                </h1>
                <p className="app-subtitle">Discover the world's weather in real-time</p>
                <div className="app-features">
                  <span className="feature-tag">🌡️ Live Temperature</span>
                  <span className="feature-tag">🌪️ Wind Speed</span>
                  <span className="feature-tag">💧 Humidity</span>
                </div>
              </div>
              
              <div className="search-section">
                <SearchBar
                  onSearch={handleSearch}
                  onLocationClick={getCurrentLocation}
                />
              </div>
            </div>
            
            <div className="weather-section">
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} />
              ) : weatherData ? (
                <WeatherCard weather={weatherData} location={currentLocation} forecast={forecastData} />
              ) : (
                <div className="welcome-message">
                  <div className="welcome-icon">🌍</div>
                  <h2>Welcome to WeatherFlow</h2>
                  <p>Your gateway to global weather insights</p>
                  <div className="welcome-tips">
                    <p>💡 <strong>Tip:</strong> Try searching for cities like "Tokyo", "Paris", or "New York"</p>
                    <p>📍 <strong>Location:</strong> Use the location button for your current weather</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <p>© 2025 WeatherFlow. Powered by OpenWeatherMap</p>
          </div>
        </footer>
      </div>
    </div>
    </div>
    </>
  );
}

export default App;
