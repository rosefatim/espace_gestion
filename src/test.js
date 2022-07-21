import React, { Component } from 'react'
import {FormControl,InputLabel,OutlinedInput,InputAdornment} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";


export class test extends Component {
  render() {
    return (
      <div>
        <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        endIcon={<AddIcon />}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
      />
    </FormControl></div>
    )
  }
}

export default test