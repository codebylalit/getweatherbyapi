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

const CardContainer = styled("div")({
  width: 320,
  minHeight: 480,
  borderRadius: 28,
  boxShadow: "0 8px 32px rgba(44, 62, 80, 0.18)",
  margin: "32px auto",
  padding: "32px 24px 24px 24px",
  background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
});

const WeatherIcon = styled("img")({
  width: 80,
  height: 80,
  margin: "24px 0 16px 0",
  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
});

const TempText = styled(Typography)({
  fontSize: "4rem",
  fontWeight: 300,
  color: "#fff",
  margin: "0 0 8px 0",
  lineHeight: 1,
  textShadow: "0 2px 8px rgba(44,62,80,0.10)",
});

const CityText = styled(Typography)({
  fontSize: "1.3rem",
  fontWeight: 500,
  color: "#fff",
  marginBottom: 4,
  letterSpacing: 1.1,
});

const DateText = styled(Typography)({
  fontSize: "1.1rem",
  color: "#f0f0f0",
  marginBottom: 16,
});

const DescText = styled(Typography)({
  fontSize: "1.1rem",
  color: "#fff",
  marginBottom: 24,
  textTransform: "capitalize",
});

const WeeklyChartContainer = styled(Box)({
  width: "100%",
  height: 80,
  marginTop: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
});

const DayLabelRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: 4,
});

const TempLineSVG = styled("svg")({
  width: "100%",
  height: 40,
  overflow: "visible",
});

function getDayShort(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
}

function getWeeklyData(hourlyForecast) {
  // Group by day, get min/max for each day
  const days = {};
  hourlyForecast.forEach((h) => {
    const day = new Date(h.dt * 1000).toLocaleDateString();
    if (!days[day]) days[day] = [];
    days[day].push(h.main.temp);
  });
  const result = Object.entries(days).slice(0, 5).map(([date, temps]) => ({
    date,
    min: Math.min(...temps),
    max: Math.max(...temps),
  }));
  return result;
}

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
      <CardContainer>
        <Typography variant="h6" style={{color: '#fff', marginBottom: 12}}>
          <span role="img" aria-label="location">📍</span> Enter a city to see the weather!
        </Typography>
        <Typography variant="body2" style={{color: '#f0f0f0'}}>
          Try searching for your favorite city.<br/>Weather updates are just a click away!
        </Typography>
      </CardContainer>
    );
  }

  const weekly = getWeeklyData(hourlyForecast);
  const temps = weekly.map((d) => d.max);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  // For line chart points
  const points = temps.map((t, i) => {
    const x = (i / (temps.length - 1)) * 280 + 20;
    const y = 35 - ((t - minTemp) / (maxTemp - minTemp || 1)) * 30 + 5;
    return `${x},${y}`;
  }).join(" ");

  return (
    <CardContainer>
      <CityText>{weather.name}, {weather.sys.country}</CityText>
      <DateText>
        {new Date(weather.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long"
        })}
      </DateText>
      <WeatherIcon
        src={weatherIcons[weather.weather[0].main]}
        alt={weather.weather[0].main}
      />
      <TempText>{Math.round(weather.main.temp)}°C</TempText>
      <DescText>{weather.weather[0].description}</DescText>
      <WeeklyChartContainer>
        <DayLabelRow>
          {weekly.map((d, i) => (
            <Typography key={i} style={{color: '#fff', fontSize: '0.95rem', flex: 1, textAlign: 'center'}}>
              {getDayShort(d.date)}
            </Typography>
          ))}
        </DayLabelRow>
        <TempLineSVG width={300} height={40}>
          <polyline
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            points={points}
            style={{filter: 'drop-shadow(0 2px 8px #fff8)'}}
          />
          {temps.map((t, i) => {
            const x = (i / (temps.length - 1)) * 280 + 20;
            const y = 35 - ((t - minTemp) / (maxTemp - minTemp || 1)) * 30 + 5;
            return (
              <circle key={i} cx={x} cy={y} r={4} fill="#fff" stroke="#00C9FF" strokeWidth={2} />
            );
          })}
        </TempLineSVG>
        <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
          {weekly.map((d, i) => (
            <Typography key={i} style={{color: '#fff', fontSize: '0.85rem', flex: 1, textAlign: 'center'}}>
              {Math.round(d.max)}°C
            </Typography>
          ))}
        </Box>
      </WeeklyChartContainer>
    </CardContainer>
  );
}

export default WeatherCard;
