import { LOGIN_USER, LOGOUT_USER, TODO_DATA } from "./action-type";

export const initialState = {
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
    default :   return state;
  }
};

export default reducer;
