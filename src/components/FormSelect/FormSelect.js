import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormLabel, Select } from '@mui/material';


const FormSelect = ({label, options, onChange, metricVal}) => {

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <FormLabel>{label}</FormLabel>
      <Select
        value={metricVal}
        onChange={onChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, idx) => (
            <MenuItem value={idx}>{option}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default FormSelect
