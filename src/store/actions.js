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

<<<<<<< HEAD

=======
>>>>>>> 2c0118a4d258f32e0a871655d0443b38b99ba682
export { addUserData, removeUserData, todoData };
