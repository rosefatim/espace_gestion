import { AccountCircle } from "@mui/icons-material";
import {
  Alert,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import { DisplayButton } from "../librairy/button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { base_url, createUser } from "../constants/url";
import Axios from "axios";

export class Register extends Component {
  state = {
    data: [],
    firstsname: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
    visibility: false,
    load: true,
    alert: false,
    alertType: "",
    alertText: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    return this.setState({
      [e.target.name]: e.target.value,
    });
  };

  closeAlert = () => {
    return this.setState({
      alert: false,
      checked: false,
    });
  };
  createUser = async () => {
    const { firstsname, lastname, email, password, confirm } = this.state;

    this.setState({
      load: true,
    });

    if (
      firstsname.length === 0 ||
      lastname.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirm.length === 0
    ) {
      return this.setState({
        load: false,
        alert: true,
        alertType: "error",
        alertText: "Remplissez tous les champs svp!",
      });
    }
    if (confirm !== password) {
      return this.setState({
        load: false,
        alert: true,
        alertType: "error",
        alertText: "passwords non identiques",
      });
    }

    setTimeout(async () => {
      console.log(1);
      await Axios.post(base_url + createUser, {
        firstsname: firstsname,
        lastname: lastname,
        email: email,
        password: password,
      })
        .then((response) => {
          console.log("Success: ", response?.data?.message);
          this.setState({
            load: false,
            firstsname: "",
            lastname: "",
            email: "",
            password: "",
          });
          console.log("ok");
        })
        .catch((error) => {
          console.log("Error: ", error?.response?.data?.message);
          this.setState({
            load: false,
          });
        });
    }, 1000);
  };
  render() {
    const { alert, alertText, alertType } = this.state;
    return (
      <div
        style={{
          backgroundColor: "#90C6D3",
          textAlign: "center",
          height: "100vh",
        }}
      >
        {/* Alert */}
        <Snackbar open={alert} onClose={() => this.closeAlert()}>
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
            // backgroundColor: "#CECECE",
            // marginLeft: "35%",
            marginTop: "5%",
            display: "inline-block",
            paddingLeft: 3,
            boxShadow: 0,
            border: "1px solid #d1d1d1",
          }}
        >
          <Typography
            component="div"
            variant="h6"
            style={{ textAlign: "center", marginTop: "5%" }}
          >
            Créer un compte
          </Typography>

          <CardContent>
            <AccountCircle
              style={{
                color: "#d1d1d1",
                width: 100,
                height: 100,
              }}
            />
            <Stack spacing={2} marginTop={2}>
              <TextField
                id="outlined-basic"
                label="Nom"
                name="firstname"
                variant="outlined"
                onChange={(e) => this.setState({ firstsname: e.target.value })}
                style={{ width: "90%" }}
              />
              <TextField
                id="outlined-basic"
                label="Prénom"
                name="lastname"
                variant="outlined"
                onChange={(e) => this.setState({ lastname: e.target.value })}
                style={{ width: "90%" }}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                onChange={(e) => this.setState({ email: e.target.value })}
                style={{ width: "90%" }}
              />
              <Stack direction="row" spacing={1}>
                <TextField
                  id="outlined-basic"
                  label="Password"
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
              <TextField
                id="outlined-basic"
                label="Confirm"
                name="confirm"
                variant="outlined"
                onChange={(e) => this.setState({ confirm: e.target.value })}
                style={{ width: "90%" }}
                type={this.state.visibility ? "text" : "password"}
              />

              <DisplayButton
                type="contained"
                disabled={false}
                text={"Submit"}
                onPress={() => {
                  this.createUser();
                }}
                style={{ width: "90%", height: 50 }}
              />

              {/* </Link> */}
            </Stack>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Register;
