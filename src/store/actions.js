import { LOGIN_USER, LOGOUT_USER, TODO_DATA } from "./action-type";

const addUserData = (data) => ({
  type: LOGIN_USER,
  data: data
});

const removeUserData = () => ({
  type: LOGOUT_USER
});

const todoData = (data) => ({
  type: TODO_DATA,
  data: data
});


export { addUserData, removeUserData, todoData };
