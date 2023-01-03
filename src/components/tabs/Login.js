import React, { Component } from "react";
import {
  Stack,
  TextField,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { DisplayButton } from "../librairy/button";
// import { regexVerifier } from "../functions/regex";
import { keyCredential, api_key } from "../constants/credential";
// import { EMAIL_CODE, PASSWORD_CODE } from "../constants/regex-code";
import { sessionHandler } from "../functions/sessionStore";
import { connect } from "react-redux";
import { addUserData } from "../../store/actions";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import {  base_url,  loginUser } from "../constants/url";

class Login extends Component {
  // states
  state = {
    email: "",
    password: "",
    visibility: false,
    alert: false,
    alertText: "Verifier les champs",
    alertType: "error",
  };

  // functions
  closeAlert = () => {
    return this.setState({
      alert: false,
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

    await Axios.post(
      base_url + loginUser,
      {
        email: email.toLowerCase().trim(),
        password,
      },
      {
        headers: {
          api_key,
        },
      }
    )
    .then((res) => {
      console.log("Success: ", res?.data?.message);
      const data = res.data.data;
      // console.log(res.data);
      this.props.saveData({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        _id: data._id,
      });
      sessionHandler("auth_token", res.data.auth_token, "set");
      return setTimeout(async () => {
        window.location.reload();
      }, 1000);
    })
    .catch((err) => {
      console.log("Error: ", err?.response?.data?.message);
      this.setState({
        load: false,
      });
    });
    // await this.props.saveData({
    //   email: email,
    //   password: password,
    // });
    // await sessionHandler("auth_token", keyCredential, "set");
    // this.setState({
    //   alert: true,
    //   alertType: "success",
    //   alertText: "Vous êtes connecté",
    // });

    // return this.props.history.push("/home");
  };

  // loginfunction1 = async (email, password) => {
  //   const postData = { email: email, password: password };
  //   const apiURL = createUser;

  //   await axios({
  //     method: "post",
  //     url: apiURL,
  //     data: postData
  //   })
  //     .then((response) => console.log("Success: ", response))
  //     .catch((error) => console.log("Error: ", error));

  //   console.log(email, password);
  // };

  render() {
    const { alert, alertText, alertType } = this.state;

    if (
      sessionHandler("auth_token", null, "get") &&
      sessionHandler("auth_token", null, "get").length !== 0
    ) {
      return <Navigate to="/todo" />;
    }

    return (
      <div
        style={{
          backgroundColor: "#90C6D3",
          textAlign: "center",
          height: "100vh",
        }}
      >
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
            // backgroundColor: "#CECECE",
            // marginLeft: "35%",
            display: "inline-block",
            marginTop: "5%",
            paddingLeft: 3,
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
                color: "#d1d1d1",
                width: 100,
                height: 100,
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

              <DisplayButton
                type="contained"
                disabled={false}
                text={"Connect"}
                onPress={() => this.handleConnect("email", "password")}
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchStoreToProps = (dispatch) => {
  return {
    saveData: (data) => {
      dispatch(addUserData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchStoreToProps)(Login);
