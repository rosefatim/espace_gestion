import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export class Test extends Component {
  render() {
    return (
      <div>
        <FormControl fullWidth sx={{ m: 1, width: "35%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">{<AddIcon />}</InputAdornment>
            }
            label="Password"
            type="password"
          />
        </FormControl>
        <IconButton
          aria-label="visibily"
          style={{ width: 30 }}
          onClick={() => this.setState({ visibility: !this.state.visibility })}
        >
          {this.state.visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </div>
    );
  }
}

export default Test;
