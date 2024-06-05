import React, { useState } from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WeatherCard from "./weathercard";
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#007BFF",
    },
    background: {
      default: "#2C3E50",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h3: {
      fontWeight: 500,
      color: "#000000",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderRadius: "4px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "4px",
        },
      },
    },
  },
});

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (city.trim() !== "") {
      try {
        const weatherResponse = await fetchWeather(city);
        const forecastResponse = await fetchHourlyForecast(city);

        setWeatherData(weatherResponse);
        setHourlyForecast(forecastResponse.list);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    } else {
      alert("Please enter a city name.");
    }
  };

  const fetchWeather = async (city) => {
    const apiKey = "117b3d6963142e46c13a0ef2ab4bb41d"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  };

  const fetchHourlyForecast = async (city) => {
    const apiKey = "117b3d6963142e46c13a0ef2ab4bb41d"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="main-container">
        <Typography variant="h3" align="center" gutterBottom>
          Weather App
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                id="cityInput"
                label="Enter city name"
                variant="outlined"
                value={city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                color="primary"
              >
                Get Weather
              </Button>
            </Grid>
          </Grid>
        </form>
        {weatherData && (
          <WeatherCard weather={weatherData} hourlyForecast={hourlyForecast} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
