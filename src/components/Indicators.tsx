import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import IndicatorWeather from './IndicatorWeather';

export default function WeatherIndicators() {
  const [weatherData, setWeatherData] = useState({
    Precipitación: '0%',
    Humedad: '0%',
    Nubosidad: '0%',
    Temperatura: '0°C',
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&appid=aeff831bd7123ebe005c7dadc1022124&units=metric'
        );
        const result = await response.json();

        const forecast = result.list[0]; // Primer elemento de la lista
        const precipitation = forecast.rain?.['3h'] ?? 0;
        const humidity = forecast.main.humidity;
        const cloudiness = forecast.clouds.all;
        const temperature = forecast.main.temp;

        setWeatherData({
          Precipitación: `${precipitation}%`,
          Humedad: `${humidity}%`,
          Nubosidad: `${cloudiness}%`,
          Temperatura: `${temperature}°C`,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={3}>
        <IndicatorWeather title="Precipitación" subtitle="Últimas 3 horas" value={weatherData.Precipitación} />
      </Grid>
      <Grid item xs={12} xl={3}>
        <IndicatorWeather title="Humedad" subtitle="Humedad relativa" value={weatherData.Humedad} />
      </Grid>
      <Grid item xs={12} xl={3}>
        <IndicatorWeather title="Nubosidad" subtitle="Cobertura de nubes" value={weatherData.Nubosidad} />
      </Grid>
      <Grid item xs={12} xl={3}>
        <IndicatorWeather title="Temperatura" subtitle="Temperatura promedio" value={weatherData.Temperatura} />
      </Grid>
    </Grid>
  );
}
