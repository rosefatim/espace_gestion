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
  Checkbox
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { DisplayButton } from "../librairy/button";
import { regexVerifier } from "../functions/regex";
import { validatorConnect } from "../functions/validator-connect";
import { sessionAdd } from "../functions/sessionAdd";
import { keyCredential } from "../constants/credential";
import { EMAIL_CODE, PASSWORD_CODE } from "../constants/regex-code";
import { sessionGet } from "../functions/sessionGet";
import { Navigate } from "react-router-dom";
// import { Redirect } from "react-router-dom";

class Login extends Component {
  // states
  state = {
    email: "",
    password: "",
    visibility: false,
    alert: false,
    alertText: "Verifier les champs",
    alertType: "error"
  };

  // functions
  closeAlert = () => {
    return this.setState({
      alert: false
    });
  };

  handleConnect = async () => {
    const { email, password } = this.state;
    // if (!regexVerifier(EMAIL_CODE, email)) {
    //   return this.setState({
    //     alert: true,
    //     alertType: "error",
    //     alertText: "Entrez un email valide"
    //   });
    // }

    // if (!regexVerifier(PASSWORD_CODE, password)) {
    //   return this.setState({
    //     alert: true,
    //     alertType: "error",
    //     alertText:
    //       "Votre password doit contenir une lettre majuscule, un nombre, un caractère spécial et un minimum de 8 caractères"
    //   });
    // }
    console.log(email, password);
    if (!validatorConnect(email, password)) {
      return this.setState({
        alert: true,
        alertType: "error",
        alertText: "Email ou Mot de passe incorrect"
      });
    }

    await sessionAdd("auth_token", keyCredential);
    this.setState({
      alert: true,
      alertType: "success",
      alertText: "Vous êtes connecté"
    });

    // return this.props.history.push("/home");
  };

  render() {
    const { alert, alertText, alertType, email, password } = this.state;

    if (sessionGet("auth_token") && sessionGet("auth_token").length !== 0) {
      return <Navigate to="/home" />;
    }

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
            severity={alertType}
            color={alertType}
          >
            {alertText}
          </Alert>
        </Snackbar>

        <Card
          sx={{
            width: "30%",
            backgroundColor: "#CECECE",
            marginLeft: "35%",
            marginTop: "5%",
            paddingLeft: 3
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
                marginLeft: "37%"
              }}
            />
            <Stack spacing={2} marginTop={2}>
              <TextField
                id="outlined-basic"
                label="email"
                name="email"
                variant="outlined"
                onChange={(e) => this.setState({ email: e.target.value })}
                style={{ width: "90%" }}
              />
              <Stack direction="row" spacing={1}>
                <TextField
                  id="outlined-basic"
                  label="password"
                  name="password"
                  variant="outlined"
                  onChange={(e) => this.setState({ password: e.target.value })}
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

              {/* <Link to="/home" style={{ textDecoration: "none", color: "white" }} > */}
              {/* <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 5 }}
                onClick={() => {
                  this.connected();
                }}
              >
                Connect
              </Button> */}

              <DisplayButton
                type="contained"
                disabled={false}
                text={"Connect"}
                onPress={() => this.handleConnect()}
                style={{}}
                textStyle={{}}
              />

              {/* </Link> */}
            </Stack>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Login;
