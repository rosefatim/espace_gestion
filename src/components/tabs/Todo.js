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
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
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
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../constants/url";
import OpenAlert from "../librairy/openAlert";
import { Delete } from "@mui/icons-material";
import { api_key } from "../constants/credential";

class Todo extends Component {
  state = {
    data: [],
    toDelete: [],
    title: "",
    todo: "",
    alert: false,
    alertType: "",
    alertText: "",
    load: true,
  };

  componentDidMount() {
    this.getAllTodos();
  }

  handleChange = (a) => {
    a.preventDefault();
    return this.setState({
      [a.target.name]: a.target.value,
    });
  };

  pushElement = () => {
    const { data, title, todo } = this.state;
    if (title.length === 0 || todo.length === 0) {
      return this.setState({ alert: true });
    }
    this.setState({
      data: [
        ...data,
        {
          id: data.length + 1,
          title: title,
          todo: todo,
        },
      ],
      title: "",
      todo: "",
    });
    return this.props.manageData([
      ...data,
      {
        id: data.length + 1,
        title: title,
        todo: todo,
      },
    ]);
  };

  deleteElement = () => {
    const { data, toDelete } = this.state;
    const newData = data.filter((item) => {
      return toDelete.includes(item.id) === false;
    });
    this.setState({
      data: newData,
      toDelete: [],
    });
    return this.props.manageData(newData);
  };

  closeAlert = () => {
    return this.setState({
      alert: false,
    });
  };

  // checkDelete = (id) => {
  //     const { toDelete} = this.state;
  //     if (toDelete.includes(id) === true) {
  //       return this.setState({
  //         toDelete: toDelete.filter((item) => item !== id),
  //       });
  //     }
  //     return this.setState({
  //       toDelete: [...toDelete, id],
  //     });
  //   };

  getAllTodos = async () => {
    await Axios.get(base_url + getAllTodo + "/" + this.props.user._id, {
      headers: {
        api_key,
        authorization: sessionHandler("auth_token", null, "get"),
      },
    })
      .then((res) => {
        console.log(res?.data);
        this.setState({
          load: false,
          data: res?.data?.data,
        });
      })
      .catch((err) => {
        console.log(err);
        //notification d'erreur
        this.setState({
          load: false,
        });
      });
  };

  createTodo = async () => {
    const { title, todo } = this.state;

    this.setState({
      load: true,
    });

    if (title.length === 0 || todo.length === 0) {
      return this.setState({
        load: false,
        alert: true,
        alertType: "error",
        alertText: "Remplissez les champs svp!",
      });
    }
    setTimeout(async () => {
      await Axios.post(
        base_url + createTodo,
        {
          title: title,
          description: todo,
          user_id: this.props.user._id, //recup id de l'utilisateur connecté
        },
        {
          headers: {
            api_key,
            authorization: sessionHandler("auth_token", null, "get"),
          },
        }
      )
        .then((response) => {
          console.log("Success: ", response?.data?.message);
          this.setState({
            load: false,
            data: [response?.data?.data, ...this.state.data],
            title: "",
            todo: "",
          });
        })
        .catch((error) => {
          console.log("Error: ", error?.response?.data?.message);
          this.setState({
            load: false,
          });
        });
    }, 1000);
  };

  updateTodo = async (id) => {
    const { title, todo } = this.state;

    this.setState({
      load: true,
    });

    setTimeout(async () => {
      await Axios.put(
        base_url + updateTodo + id,
        {
          achieved: true,
        },
        {
          headers: {
            api_key,
            authorization: sessionHandler("auth_token", null, "get"),
          },
        }
      )
        .then((response) => {
          console.log("Success: ", response?.data?.message);
          // this.setState({
          //   load: false,
          //   data: [response?.data?.data, ...this.state.data],
          // });
          return window.location.reload();
        })
        .catch((error) => {
          console.log("Error: ", error?.response?.data?.message);
          // ajouter notification ici
          this.setState({
            load: false,
          });
        });
    }, 1000);
  };

  update = async () => {
    this.setState({
      load: true,
    });
  };

  checkDelete = async (id) => {
    const { data } = this.state;

    this.setState({
      load: true,
    });

    if (
      data.find((item) => {
        return item._id === id;
      }) !== undefined
    ) {
      setTimeout(async () => {
        await Axios.delete(base_url + deleteTodo + id)
          .then(
            (res) => {
              console.log(res.data);
              //delete avec succes
              return this.setState({
                toDelete: [...this.state.toDelete, id],
                data: data.filter((item) => item._id !== id),
                load: false,
              });
            },
            {
              headers: {
                api_key,
                authorization: sessionHandler("auth_token", null, "get"),
              },
            }
          )
          .catch((err) => {
            console.log(err);
            // notifier a l'utilisateur que ca a echouer
            this.setState({
              load: false,
            });
          });
      }, 1000);
    }
  };

  render() {
    const { title, todo, alert, alertText, alertType, toDelete, data, load } =
      this.state;
    const { user } = this.props;
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
              <Typography component="div" sx={{ flexGrow: 1 }}>
                Bienvenue {user.lastname}
              </Typography>

              <Stack direction="row " justifyContent="space-evently">
                <DisplayLink
                  to="error"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: 5,
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

        {/* Main */}
        <h1 style={{ textAlign: "center" }}>My TodoList</h1>
        <Stack
          direction="column"
          spacing={3}
          justifyContent="space-evenly"
          paddingTop={10}
        >
          <Stack direction="row" spacing={3} justifyContent="space-evenly">
            <Box sx={{ width: "40%", border: "1px solid black", padding: 5 }}>
              <h3> Inachivés</h3>
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
                              this.updateTodo(item._id);
                            }}
                          />
                        }
                        label={item.title + " : " + item.description}
                      />
                    </FormGroup>
                  ))
              )}
            </Box>
            <Box sx={{ width: "40%", border: "1px solid black", padding: 5 }}>
              <h3> Achivés</h3>
              {load ? (
                <CircularProgress />
              ) : (
                data
                  ?.filter((res) => {
                    return res?.achieved;
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
          </Stack>

          {/* right*/}
          <Box sx={{ width: "30%", paddingLeft: "40%" }} component="form">
            <h1 style={{ paddingLeft: "20%" }}>Add a Todo</h1>
            <Stack direction="row" padding={2} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Title"
                name="title"
                value={title}
                variant="outlined"
                onChange={(e) => this.handleChange(e)}
              />
              <TextField
                id="outlined-basic"
                label="Description"
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
              <Stack direction="row" spacing={2} style={{ marginLeft: "20%" }}>
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
                    this.checkDelete();
                  }}
                />
              </Stack>
            )}
          </Box>
        </Stack>
        {/*  {JSON.stringify(this.state.data)}  */}
        {/* Footer */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    todo: state.todo,
  };
};

const mapDispatchStoreToProps = (dispatch) => {
  return {
    deleteData: () => {
      dispatch(removeUserData());
    },
    manageData: (data) => {
      dispatch(todoData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchStoreToProps)(Todo);
