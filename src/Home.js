import React, { Component } from "react";
import {
  Stack,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  FormGroup,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";




class App extends Component {
  state = {
    data: [],
    toDelete: [],
    jour: "",
    todo: "",
    alert: false,
  };


  handleChange = (e) => {
    e.preventDefault();
    return this.setState({
      [e.target.name]: e.target.value,
    });
  };

  pushElement = () => {
    const { data, jour, todo } = this.state; 
    if (jour.length === 0 || todo.length === 0) {
      return this.setState({ alert: true });
    }
    return this.setState({
      data: [
        ...data,
        {
          id: data.length + 1,
          jour: jour,
          todo: todo,
        },
      ],
      jour: "",
      todo: "",
    });
  };
  deleteElement = () => {
    const { data, toDelete } = this.state;
    const newData = data.filter((item) => {
      return toDelete.includes(item.id) === false;
    });
    return this.setState({
      data: newData,
      toDelete: [],
    });
  };
  closeAlert = () => {
    return this.setState({
      alert: false,
    });
  };

  checkDelete = (id) => {
    const { toDelete } = this.state;
    if (toDelete.includes(id) === true) {
      return this.setState({
        toDelete: toDelete.filter((item) => item !== id),
      });
    }
    return this.setState({
      toDelete: [...toDelete, id],
    });
  };

  render() {
    const { data, jour, todo, alert, toDelete } = this.state;
    return (
      <div>
        
       {/* Header */}
        <Box sx={{ flexGrow: 1}}>
          <AppBar position="static" style={{paddingLeft:25,paddingRight:25}}>
            <Toolbar>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                LOGO
              </Typography>
              <Stack direction="row " justifyContent="space-evently">
                {/* <Button color="inherit" startIcon={<HomeIcon />} style={{marginRight:20}}>
                  Home
                </Button> */}
                <Link to="/login" style={{textDecoration:"none" , color:"white"}}>
                <Button color="inherit" startIcon={<AccountCircle />}>
                    Logout                 
                </Button>
                </Link>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>

        {/* Alert */}
        <Snackbar
          open={alert}
          // autoHideDuration={6000}
          onClose={() => this.closeAlert()}
        >
          <Alert
            onClose={() => {
              this.closeAlert();
            }}
            severity="error"
            color="error"
          >
            Remplissez les champs
          </Alert>
        </Snackbar>

        {/* Main */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-evenly"
          paddingTop={10}
        >
          <Box sx={{ width: "40%", border: "1px solid black", padding: 5 }}>
            <h1>My TodoList</h1>
            {data?.map((item) => (
              <FormGroup key={item.id}>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      checked={toDelete.includes(item.id)}
                      onChange={() => {
                        this.checkDelete(item.id);
                      }}
                    />
                  }
                  label={item.jour + " : " + item.todo}
                />
              </FormGroup>
            ))}
          </Box>
          <Box sx={{ width: "30%" }} component="form">
            <h1>Add a Todo</h1>
            <Stack direction="row" padding={2} spacing={2}>
              <TextField
                id="outlined-basic"
                label="jour"
                name="jour"
                value={jour}
                variant="outlined"
                onChange={(e) => this.handleChange(e)}
              />
              <TextField
                id="outlined-basic"
                label="todo"
                name="todo"
                value={todo}
                variant="outlined"
                onChange={(e) => this.handleChange(e)}
              />
            </Stack>
            <Stack direction="row" spacing={2} style={{ marginLeft: "25%" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  this.pushElement();
                }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  this.deleteElement();
                }}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Stack>

        {/* Footer */}
      </div>
    );
  }
}

export default App;
