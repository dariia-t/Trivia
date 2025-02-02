import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';


export default function BasicSelect({ difficulty, onDifficultyChange }) {
  //const [difficulty, setDifficulty] = React.useState('');

  const handleChange = (event) => {
    onDifficultyChange(event.target.value); 
  };

  return (
    <Box sx={{ minWidth: 120}}>
      <Typography variant="h5" component="div" sx={{ marginBottom: 2, marginTop: 2 }}>
        Select the difficulty level
      </Typography>
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" >Difficulty</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={difficulty} 
            label="Difficulty"
            onChange={handleChange}
          >
            {/* all the options from the api */}
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
      </FormControl>
    </Box>
  );
}
