import React, { Component } from "react";
import {
  Stack,
  Checkbox,
  FormControlLabel,
  TextField,
  Box,
  Snackbar,
  Alert,
  FormGroup,
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { DisplayLink } from "../librairy/buttonLink";
import { DisplayButton } from "../librairy/button";
import { Navigate } from "react-router-dom";
import { sessionHandler } from "../functions/sessionStore";
import { removeUserData, todoData } from "../../store/actions";
import { connect } from "react-redux";
import Axios from "axios";
import {
  base_url,
  createTodoUrl,
  deleteTodo,
  getAllTodo
} from "../constants/url";

import CircularProgress from "@mui/material/CircularProgress";

class Home extends Component {
  state = {
    data: [],
    toDelete: [],
    day: "",
    todo: "",
    alert: false,
    load: true
  };

  componentDidMount() {
    this.getAllTodos();
  }

  handleChange = (e) => {
    e.preventDefault();
    return this.setState({
      [e.target.name]: e.target.value
    });
  };

  pushElement = () => {
    const { data, day, todo } = this.state;
    if (day.length === 0 || todo.length === 0) {
      return this.setState({ alert: true });
    }
    this.setState({
      data: [
        ...data,
        {
          id: data.length + 1,
          day: day,
          todo: todo
        }
      ],
      day: "",
      todo: ""
    });
    return this.props.manageData([
      ...data,
      {
        id: data.length + 1,
        day: day,
        todo: todo
      }
    ]);
  };
  deleteElement = () => {
    const { data, toDelete } = this.state;
    const newData = data.filter((item) => {
      return toDelete.includes(item.id) === false;
    });
    this.setState({
      data: newData,
      toDelete: []
    });
    return this.props.manageData(newData);
  };
  closeAlert = () => {
    return this.setState({
      alert: false
    });
  };

  checkDelete = async (id) => {
    const { data } = this.state;
    this.setState({
      load: true
    });
    console.log("hey");
    if (
      data.find((item) => {
        return item._id === id;
      }) !== undefined
    ) {
      console.log("hey 2");

      setTimeout(async () => {
        await Axios.delete(base_url + deleteTodo + id)
          .then((res) => {
            console.log(res.data);
            return this.setState({
              toDelete: [...this.state.toDelete, id],
              data: data.filter((item) => item._id !== id),
              load: false
            });
          })
          .catch((err) => {
            console.log(err);
            // notifier a l'utilisateur que ca a echouer
            this.setState({
              load: false
            });
          });
      }, 2500);
    }
  };

  createTodo = async () => {
    const { day, todo } = this.state;
    this.setState({
      load: true
    });

    if (day.length === 0 || todo.length === 0) {
      console.log("Not upload because of length");
      return this.setState({
        load: false
      });
    }

    setTimeout(async () => {
      await Axios.post(base_url + createTodoUrl, {
        title: day,
        description: todo,
        user_id: "638637fe3bcbd09abf98a1f7"
      })
        .then((response) => {
          console.log("Success: ", response?.data?.message);
          this.setState({
            load: false,
            data: [response?.data?.data, ...this.state.data]
          });
        })
        .catch((error) => {
          console.log("Error: ", error?.response?.data?.message);
          // ajouter notification ici
          this.setState({
            load: false
          });
        });
    }, 2000);
  };

  getAllTodos = async () => {
    await Axios.get(base_url + getAllTodo)
      .then((res) => {
        console.log(res?.data);
        this.setState({
          load: false,
          data: res?.data?.data
        });
      })
      .catch((err) => {
        console.log(err);
        //notification d'erreur
        this.setState({
          load: false
        });
      });
  };

  render() {
    const { day, todo, alert, toDelete, data, load } = this.state;

    if (
      !sessionHandler("auth_token", null, "get") ||
      sessionHandler("auth_token", null, "get").length === 0
    ) {
      return <Navigate to="/" />;
    }

    return (
      <div>
        {/* Header */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            style={{ paddingLeft: 25, paddingRight: 25 }}
          >
            <Toolbar>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                LOGO
              </Typography>
              <Stack direction="row " justifyContent="space-evently">
                <DisplayLink
                  to="error"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: 5
                  }}
                  disabled={false}
                  text="Contact Us"
                />
                <DisplayLink
                  to="/"
                  style={{ textDecoration: "none", color: "white" }}
                  disabled={false}
                  text="Logout"
                  onPress={async () => {
                    await this.props.deleteData();
                    return sessionHandler("auth_token", null, "remove");
                  }}
                  textStyle={{ textDecoration: "none" }}
                  startIcon={<AccountCircle />}
                />
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
            {load ? (
              <CircularProgress />
            ) : (
              data
                ?.filter((res) => {
                  return !res?.achieved;
                })
                .map((item) => (
                  <FormGroup key={item._id}>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          checked={toDelete.includes(item._id)}
                          onChange={() => {
                            this.checkDelete(item._id);
                          }}
                        />
                      }
                      label={item.title + " : " + item.description}
                    />
                  </FormGroup>
                ))
            )}
          </Box>
          <Box sx={{ width: "30%" }} component="form">
            <h1>Add a Todo</h1>
            <Stack direction="row" padding={2} spacing={2}>
              <TextField
                id="outlined-basic"
                label="day"
                name="day"
                value={day}
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
            {load ? (
              <Box>
                <CircularProgress />
              </Box>
            ) : (
              <Stack direction="row" spacing={2} style={{ marginLeft: "25%" }}>
                <DisplayButton
                  type="contained"
                  text="Add"
                  color="primary"
                  startIcon={<AddIcon />}
                  style={{ height: 50 }}
                  onPress={() => {
                    this.createTodo();
                  }}
                />
                <DisplayButton
                  type="contained"
                  text="Delete"
                  color="error"
                  startIcon={<DeleteIcon />}
                  style={{ height: 50 }}
                  onPress={() => {
                    this.deleteElement();
                  }}
                />
              </Stack>
            )}
          </Box>
        </Stack>
        {/* {JSON.stringify(this.state.data)} */}
        {/* Footer */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    todo: state.todo
  };
};

const mapDispatchStoreToProps = (dispatch) => {
  return {
    deleteData: () => {
      dispatch(removeUserData());
    },
    manageData: (data) => {
      dispatch(todoData(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchStoreToProps)(Home);
