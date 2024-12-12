import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

export default function LineChartWeather({ variable }) {
  const [data, setData] = useState([]);
  const xLabels = ['Hora 1', 'Hora 2', 'Hora 3', 'Hora 4', 'Hora 5', 'Hora 6', 'Hora 7'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat={LAT}&lon={LON}&appid={YOUR_API_KEY}');
        const result = await response.json();

        const precipitationData = result.list.map((item) => (item.rain ? item.rain['3h'] || 0 : 0));
        const humidityData = result.list.map((item) => item.main.humidity);
        const cloudinessData = result.list.map((item) => item.clouds.all);

        const variablesMap = {
          Precipitación: precipitationData.slice(0, 7),
          Humedad: humidityData.slice(0, 7),
          Nubosidad: cloudinessData.slice(0, 7),
        };

        setData(variablesMap[variable] || []);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (variable !== "-1") {
      fetchData();
    }
  }, [variable]);

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LineChart
        width={500}
        height={300}
        series={[{ data, label: variable }]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </Paper>
  );
}
