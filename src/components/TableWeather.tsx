import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface WeatherRow {
  startTime: string;
  endTime: string;
  precipitation: string;
  humidity: string;
  cloudiness: string;
}

export default function WeatherTable() {
  const [rows, setRows] = useState<WeatherRow[]>([]);

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
          const endTime = timeNode.getAttribute('to')?.split('T')[1] || 'N/A';
          const precipitation = timeNode.querySelector('precipitation')?.getAttribute('probability') || '0';
          const humidity = timeNode.querySelector('humidity')?.getAttribute('value') || 'N/A';
          const cloudiness = timeNode.querySelector('clouds')?.getAttribute('value') || 'N/A';

          return {
            startTime,
            endTime,
            precipitation,
            humidity,
            cloudiness,
          };
        });

        const data2 = data.slice(-6);
        setRows(data2);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="weather table">
        <TableHead>
          <TableRow>
            <TableCell>Hora de inicio</TableCell>
            <TableCell align="right">Hora de fin</TableCell>
            <TableCell align="right">Precipitación</TableCell>
            <TableCell align="right">Humedad</TableCell>
            <TableCell align="right">Nubosidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.startTime}
              </TableCell>
              <TableCell align="right">{row.endTime}</TableCell>
              <TableCell align="right">{row.precipitation}</TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
              <TableCell align="right">{row.cloudiness}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
