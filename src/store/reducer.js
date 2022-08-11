<<<<<<< HEAD
import { LOGIN_USER, LOGOUT_USER, TODO_DATA} from "./action-type";
=======
import { LOGIN_USER, LOGOUT_USER, TODO_DATA } from "./action-type";
>>>>>>> 2c0118a4d258f32e0a871655d0443b38b99ba682

const initialState = {
  todo: [],
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.data
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {}
      };
    case TODO_DATA:
      return {
        ...state,
        todo: action.data
      };
<<<<<<< HEAD
    default :   return state;
  }
=======
  }

  return state;
>>>>>>> 2c0118a4d258f32e0a871655d0443b38b99ba682
};

export default reducer;
