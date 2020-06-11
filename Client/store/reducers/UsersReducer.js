import {
  LOGIN,
  REGISTER,
  GET_USER,
  LOGOUT,
  SET_BAN_STATUS,
} from "../actions/const";
const initialState = {
  token: "",
  email: "",
  name: "",
  role: "",
  id: "",
  banned: false,
};

const UsersReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT: {
      return initialState;
    }
    case LOGIN:
      return {
        token: action.payload.token,
      };
    case REGISTER:
      return {
        token: action.payload.token,
      };

    case GET_USER:
      return {
        token: state.token,
        email: action.payload.email,
        name: action.payload.name,
        role: action.payload.role,
        id: action.payload.id,
      };

    case SET_BAN_STATUS:
      return {
        ...state,
        banned: action.payload.banned,
      };
    default:
      return state;
  }
};

export default UsersReducers;
