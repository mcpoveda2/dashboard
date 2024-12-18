import './App.css';
import { useState } from 'react';
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import WeatherIndicators from './components/Indicators';


import Grid from '@mui/material/Grid';

export function App() {
  const [selectedVariable, setSelectedVariable] = useState("Sin Estado");

  const handleVariableChange = (variable : string) => {
    setSelectedVariable(variable); // Corregido: cerrar correctamente el cuerpo de la función
  };



  return (
    <Grid container spacing={5}>
      {/* Indicadores */}
      <Grid item xs={12}>
        <WeatherIndicators />
      </Grid>

      {/* Tabla y Gráfico */}
      <Grid item xs={12} xl={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} xl={3}>
            <ControlWeather onVariableChange={handleVariableChange} />
          </Grid>
          <Grid item xs={12} xl={9}>
            <LineChartWeather variable={selectedVariable} />
          </Grid>
        </Grid>
      </Grid>

      {/* Tabla */}
      <Grid item xs={12} xl={6}>
        <TableWeather />
      </Grid>
    </Grid>
  );
}

export default App;
