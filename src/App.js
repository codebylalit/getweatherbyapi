import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");

  const API_KEY = "117b3d6963142e46c13a0ef2ab4bb41d"; // Replace with your actual API key
  const BASE_URL = "https://api.openweathermap.org/data/2.5";

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found. Please try again.");
      }

      const weather = await weatherResponse.json();

      setWeatherData(weather);
      setCurrentLocation(city);
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
            const response = await fetch(
              `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            setWeatherData(data);
            setCurrentLocation(data.name);
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
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <span className="weather-icon">🌤️</span>
              Weather App
            </h1>
            <p className="app-subtitle">Get real-time weather updates</p>
          </div>
        </header>

        <main className="app-main">
          <SearchBar
            onSearch={handleSearch}
            onLocationClick={getCurrentLocation}
          />

          {loading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} />}

          {weatherData && !loading && !error && (
            <div className="weather-content">
              <WeatherCard weather={weatherData} location={currentLocation} />
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p>© 2024 Weather App. Built with React & OpenWeatherMap API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
