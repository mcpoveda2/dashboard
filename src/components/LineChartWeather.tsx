import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

export default function LineChartWeather({ variable }) {
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=aeff831bd7123ebe005c7dadc1022124&units=metric'
        );
        const textXML = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(textXML, 'application/xml');

        const data = Array.from(xml.getElementsByTagName('time')).map((timeNode) => {
          const startTime = timeNode.getAttribute('from')?.split('T')[1] || 'N/A';
          const precipitation = parseFloat(timeNode.querySelector('precipitation')?.getAttribute('probability') || '0');
          const humidity = parseFloat(timeNode.querySelector('humidity')?.getAttribute('value') || '0');
          const cloudiness = parseFloat(timeNode.querySelector('clouds')?.getAttribute('value') || '0');

          return {
            startTime,
            Precipitación: precipitation * 100,
            Humedad: humidity,
            Nubosidad: cloudiness,
          };
        });

        const selectedData = data.slice(-6); // Últimos 6 valores
        setXLabels(selectedData.map((item) => item.startTime));
        setData(selectedData.map((item) => item[variable] || 0));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (variable !== "Sin Estado") {
      fetchWeatherData();
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
         width={425}
         height={300}
         series={[{ data, label: variable }]}
         xAxis={[{ scaleType: 'point', data: xLabels }]}
         yAxis={[{ min: 0, max: 100 }]} // Ajusta los límites del eje Y
         margin={{ top: 20, bottom: 30, left: 50, right: 20 }} // Márgenes ajustados
      />
    </Paper>
  );
}
