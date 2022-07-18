import React, { Component } from 'react';
import {
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  TextField,
  Button,
  Stack,
  Box,
  Alert,
  Snackbar
} from "@mui/material";


class App extends Component {
  state = {
    data: [],
    toDelete: [],
    firstName: "",
    lastName: "",
    alert: false
  };
  handleChange = (e) => {
    e.preventDefault();
    return this.setState({
      [e.target.name]: e.target.value
    });
  };
  pushElement = () => {
    const { data, firstName, lastName } = this.state;
    if (firstName.length === 0 || lastName.length === 0) {
      return this.setState({ alert: true });
    }
    return this.setState({
      data: [
        ...data,
        {
          id: data.length + 1,
          firstName: firstName,
          lastName: lastName
        }
      ],
      firstName: "",
      lastName: ""
    });
  };
  deleteElement = () => {
    const { data, toDelete } = this.state;
    const newData = data.filter((item) => {
      return toDelete.includes(item.id) === false;
    });
    return this.setState({
      data: newData,
      toDelete: []
    });
  };
  closeAlert = () => {
    return this.setState({
      alert: false
    });
  };
  checkDelete = (id) => {
    const { toDelete } = this.state;
    if (toDelete.includes(id) === true) {
      return this.setState({
        toDelete: toDelete.filter((item) => item !== id)
      });
    }
    return this.setState({
      toDelete: [...toDelete, id]
    });
  };
  render() {
    const { data, firstName, lastName, alert, toDelete } = this.state;
    return (
      <div>
        {/* Detection d’erreur Alert */}
        <Snackbar
          open={alert}
          autoHideDuration={6000}
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
        
        <Stack direction="row" spacing={3} justifyContent="space-evenly" paddingTop={10} >
          <Box sx={{width: "50%", border: "1px solid black", padding: 10 }}>
            <Typography variant="h2">Liste des noms</Typography>
            {data?.map((item) => (
              <FormGroup key={item.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toDelete.includes(item.id)}
                      onChange={() => {
                        this.checkDelete(item.id);
                      }}
                    />
                  }
                  label={item.firstName + ""  + item.lastName}
                />
              </FormGroup>
            ))}
          </Box>
          <Box sx={{ width: "20%" }} component="form" >
            <Stack direction="row" style={{ marginTop: 15 }}>
              <TextField
                fullWidth
                label="Nom"
                id="fullWidth"
                name="firstName"
                value={firstName}
                onChange={(e) => this.handleChange(e)}
              />
              <TextField
                fullWidth
                label="Prénom"
                id="fullWidth"
                style={{ marginLeft: 15 }}
                name="lastName"
                value={lastName}
                onChange={(e) => this.handleChange(e)}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 10 }}
                onClick={() => {
                  this.pushElement();
                }}
              >
                Ajouter
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ marginTop: 10 }}
                onClick={() => {
                  this.deleteElement();
                }}
              >
                Supprimer
              </Button>
            </Stack>
            {/* {firstName + ” ” + lastName} */}
            {/* {JSON.stringify(toDelete)} */}
          </Box>
        </Stack>
      </div>
    );
  }
}
export default App;
