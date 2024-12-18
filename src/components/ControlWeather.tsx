import  { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';

interface ControlWeatherProps {
  onVariableChange: (variable: string) => void; // Función que recibe un string
}

export default function ControlWeather({ onVariableChange }: ControlWeatherProps) {
  const [selectedVariable, setSelectedVariable] = useState("-1");

  const handleChange = (event : SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedVariable(value);
    onVariableChange(value); // Notificar al componente padre sobre el cambio
  };

  const items = [
    { name: "Precipitación", description: "Cantidad de agua que cae sobre una superficie en un período específico." },
    { name: "Humedad", description: "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje." },
    { name: "Nubosidad", description: "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida." },
  ];

  const options = items.map((item, key) => (
    <MenuItem key={key} value={item.name}>
      {item.name}
    </MenuItem>
  ));

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography mb={2} component="h3" variant="h6" color="primary">
        Variables Meteorológicas
      </Typography>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="variable-select-label">Variable</InputLabel>
          <Select
            labelId="variable-select-label"
            id="variable-select"
            value={selectedVariable}
            onChange={handleChange}
            label="Variables"
          >
            <MenuItem key="-1" value="-1" disabled>
              Seleccione una variable
            </MenuItem>
            {options}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}
