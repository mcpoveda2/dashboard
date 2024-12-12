import './App.css';
import React, { useState } from 'react';
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import Grid from '@mui/material/Grid';

export function App() {
  const [selectedVariable, setSelectedVariable] = useState("-1");

  const handleVariableChange = (variable) => {
    setSelectedVariable(variable); // Corregido: cerrar correctamente el cuerpo de la función
  };

  return (
    <Grid container spacing={5}>
      {/* Indicadores */}
      <Grid item xs={12} xl={3}>
        <IndicatorWeather title={'Indicator 1'} subtitle={'Unidad 1'} value={"1.23"} />
      </Grid>
      <Grid item xs={12} xl={3}>
        <IndicatorWeather title={'Indicator 2'} subtitle={'Unidad 2'} value={"3.12"} />
      </Grid>
      <Grid item xs={12} xl={3}>
        <IndicatorWeather title={'Indicator 3'} subtitle={'Unidad 3'} value={"2.31"} />
      </Grid>
      <Grid item xs={12} xl={3}>
        <IndicatorWeather title={'Indicator 4'} subtitle={'Unidad 4'} value={"3.21"} />
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
