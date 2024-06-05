import React from "react";
import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";

// Weather condition icons object
const weatherIcons = {
  Clear: "https://www.accuweather.com/images/weathericons/1.svg",
  Clouds: "https://www.accuweather.com/images/weathericons/2.svg",
  Rain: "https://www.accuweather.com/images/weathericons/3.svg",
  Thunderstorm: "https://www.accuweather.com/images/weathericons/4.svg",
  Snow: "https://www.accuweather.com/images/weathericons/5.svg",
  Mist: "https://www.accuweather.com/images/weathericons/6.svg",
  Fog: "https://www.accuweather.com/images/weathericons/7.svg",
  Haze: "https://www.accuweather.com/images/weathericons/8.svg",
  // Add more weather conditions and their corresponding image URLs as needed
};

const Container = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: theme.spacing(1),
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  marginTop: theme.spacing(2),
  textAlign: "center",
}));

const LargeIcon = styled("img")({
  width: "80px",
  height: "80px",
  margin: "0 auto",
  display: "block",
});

const SmallIcon = styled("img")({
  width: "30px",
  height: "30px",
  marginRight: "8px",
});

const HourlyForecastTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 500,
}));

const HourlyForecastContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "16px",
});

const HourlyForecastItem = styled(Box)({
  textAlign: "center",
});

function WeatherCard({ weather, hourlyForecast }) {
  if (
    !weather ||
    !weather.name ||
    !weather.sys ||
    !weather.main ||
    !weather.weather ||
    weather.weather.length === 0 ||
    !hourlyForecast ||
    hourlyForecast.length === 0
  ) {
    return (
      <Container>
        <Typography variant="h6">
          Enter the full location address...
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h5" component="div">
        {weather.name}, {weather.sys.country}
      </Typography>
      <Typography variant="h6" component="div">
        {new Date(weather.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <Typography variant="h4" component="div">
        {new Date(weather.dt * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <LargeIcon
        src={weatherIcons[weather.weather[0].main]}
        alt={weather.weather[0].main}
      />
      <Typography variant="h6" component="div">
        {weather.main.temp}°C
      </Typography>
      <Typography variant="subtitle1" component="div">
        {weather.weather[0].description}
      </Typography>

      <HourlyForecastTitle variant="h6">Hourly Forecast</HourlyForecastTitle>
      <HourlyForecastContainer>
        {hourlyForecast.slice(0, 5).map((hour) => (
          <HourlyForecastItem key={hour.dt}>
            <SmallIcon
              src={weatherIcons[hour.weather[0].main]}
              alt={hour.weather[0].main}
            />
            <Typography variant="body2" component="div">
              {new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography variant="body2" component="div">
              {hour.main.temp}°C
            </Typography>
          </HourlyForecastItem>
        ))}
      </HourlyForecastContainer>
    </Container>
  );
}

export default WeatherCard;
