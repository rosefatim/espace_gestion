import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

class Composant extends Component {
  render() {
    return (
      <div  style={{ height: 400, width: "100%" , marginTop:"30%"}} >
        <h1>Add a Todo</h1>
        <Stack >
          <Stack direction="row" padding={2} spacing={2}>
            <TextField id="outlined-basic" label="jour" variant="outlined" />
            <TextField id="outlined-basic" label="Todo" variant="outlined" />
          </Stack>
          <Stack direction="row" spacing={2} style={{ marginBottom: 10, marginLeft:'25%'}}>
            <Button variant="contained" color="success" startIcon={<AddIcon />}>
              Add
            </Button>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </div>
    );
  }
}

export default Composant;
