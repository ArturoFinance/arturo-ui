import React from 'react'
import { TextField, FormLabel } from '@mui/material'

const FormInput = ({ label }) => {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <TextField
        id={label}
        margin="none"
        type='text'
        variant="outlined"
        fullWidth
      />
    </div>
  )
}

export default FormInput
