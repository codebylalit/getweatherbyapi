// Weather condition to background image mapping
export const getWeatherBackground = (weatherData) => {
  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overlay: 'rgba(0, 0, 0, 0.3)'
    };
  }

  const weatherId = weatherData.weather[0].id;
  const isDay = weatherData.dt > weatherData.sys.sunrise && weatherData.dt < weatherData.sys.sunset;
  
  // Weather condition mapping based on OpenWeatherMap weather codes
  const backgrounds = {
    // Clear sky
    800: isDay 
      ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80'
      : 'https://images.unsplash.com/photo-1534796636912-3b95b3e5986f?auto=format&fit=crop&w=1920&q=80',
    
    // Few clouds
    801: isDay
      ? 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80'
      : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    
    // Scattered clouds
    802: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80',
    
    // Broken clouds
    803: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80',
    
    // Overcast clouds
    804: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80',
    
    // Thunderstorm
    200: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    201: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    202: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    210: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    211: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    212: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    221: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    230: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    231: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    232: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
    
    // Drizzle
    300: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    301: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    302: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    310: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    311: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    312: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    313: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    314: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    321: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    
    // Rain
    500: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    501: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    502: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    503: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    504: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    511: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    520: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    521: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    522: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    531: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1920&q=80',
    
    // Snow
    600: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    601: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    602: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    611: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    612: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    613: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    615: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    616: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    620: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    621: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    622: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    
    // Atmosphere (fog, mist, etc.)
    701: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    711: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    721: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    731: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    741: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    751: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    761: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    762: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    771: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    781: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
  };

  const backgroundUrl = backgrounds[weatherId] || backgrounds[800]; // Default to clear sky
  const overlayOpacity = weatherId >= 200 && weatherId < 600 ? 0.4 : 0.3; // Darker overlay for rain/snow

  return {
    background: `url(${backgroundUrl})`,
    overlay: `rgba(0, 0, 0, ${overlayOpacity})`
  };
};

// Get weather icon based on weather condition
export const getWeatherIcon = (weatherId, isDay = true) => {
  const icons = {
    // Clear sky
    800: isDay ? '☀️' : '🌙',
    
    // Few clouds
    801: isDay ? '🌤️' : '☁️',
    
    // Scattered clouds
    802: '⛅',
    
    // Broken clouds
    803: '☁️',
    
    // Overcast clouds
    804: '☁️',
    
    // Thunderstorm
    200: '⛈️',
    201: '⛈️',
    202: '⛈️',
    210: '⛈️',
    211: '⛈️',
    212: '⛈️',
    221: '⛈️',
    230: '⛈️',
    231: '⛈️',
    232: '⛈️',
    
    // Drizzle
    300: '🌦️',
    301: '🌦️',
    302: '🌦️',
    310: '🌦️',
    311: '🌦️',
    312: '🌦️',
    313: '🌦️',
    314: '🌦️',
    321: '🌦️',
    
    // Rain
    500: '🌧️',
    501: '🌧️',
    502: '🌧️',
    503: '🌧️',
    504: '🌧️',
    511: '🌧️',
    520: '🌧️',
    521: '🌧️',
    522: '🌧️',
    531: '🌧️',
    
    // Snow
    600: '❄️',
    601: '❄️',
    602: '❄️',
    611: '❄️',
    612: '❄️',
    613: '❄️',
    615: '❄️',
    616: '❄️',
    620: '❄️',
    621: '❄️',
    622: '❄️',
    
    // Atmosphere
    701: '🌫️',
    711: '🌫️',
    721: '🌫️',
    731: '🌫️',
    741: '🌫️',
    751: '🌫️',
    761: '🌫️',
    762: '🌫️',
    771: '🌫️',
    781: '🌫️',
  };

  return icons[weatherId] || '🌤️';
}; 