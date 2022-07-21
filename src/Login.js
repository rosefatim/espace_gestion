import React, { Component } from "react";
import {
  Button,
  Stack,
  TextField,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

class Login extends Component {
  // states
  state = {
    email: "",
    password: "",
    visibility: false,
    alert: false,
  };

  // functions
  closeAlert = () => {
    return this.setState({
      alert: false,
    });
  };

  connected = () => {
    const { email, password } = this.state;
    if (email.length === 0 || password.length === 0) {
      return this.setState({ alert: true });
    }
    return this.setState({});
  };

  render() {
    return (
      <div>
        {/* Alert */}
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

        <Card
          sx={{
            width: "30%",
            backgroundColor: "#CECECE",
            marginLeft: "35%",
            marginTop: "5%",
          }}
        >
          <Typography
            component="div"
            variant="h6"
            style={{ textAlign: "center", marginTop: "5%" }}
          >
            Sign In
          </Typography>
          <CardContent>
            <AccountCircle
              style={{
                color: "blue",
                width: 100,
                height: 100,
                marginLeft: "37%",
              }}
            />
            <Stack spacing={2} marginTop={2}>
              <TextField
                id="outlined-basic"
                label="email"
                name="email"
                variant="outlined"
                style={{ width: "90%" }}
              />
              <Stack direction="row" spacing={1}>
                <TextField
                  id="outlined-basic"
                  label="password"
                  name="password"
                  variant="outlined"
                  style={{ width: "90%" }}
                  type={this.state.visibility ? "text" : "password"}
                  
                />
        

                <IconButton
                  aria-label="visibily"
                  style={{ width: 30 }}
                  onClick={() =>
                    this.setState({ visibility: !this.state.visibility })
                  }
                >
                  {this.state.visibility ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </Stack>
              <Stack direction="row">
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Remember me" />
                </FormGroup>
                {/* <Link to="/home" style={{ textDecoration: "none", color: "white" }} > */}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 5, marginLeft:"23%"}}
                  onClick={() => {
                    this.connected();
                  }}
                >
                  Connect
                </Button>
                {/* </Link> */}
              </Stack>

              <Button href="#text-buttons">Forgot password?</Button>
            </Stack>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Login;
