import React, { Component } from "react";
import Stack from "@mui/material/Stack";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';



const data = [
  { jour: "Lundi : Learn React" },
  { jour: "Mardi : Learn Js" },
  { jour: "Mercredi : Express js" },
  { jour: "Jeudi : React again " },
  { jour: "Vendredi : Js" },
];
class App extends Component {
  render() {
    return (
      <div style={{width:"50%"}}>
        <h1>My TodoList</h1>
        <Stack border={1} padding={2}  >
          {data.map((item) => (
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              label={item.jour}
              labelPlacement="end"
            /> 
          ))}
        </Stack>
        </div>
    );
  }
}

export default App;
