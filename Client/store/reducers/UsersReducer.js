import { LOGIN, REGISTER, GET_USER } from "../actions/const";
const initialState = {
  token: "",
  email: "",
  name: "",
};

const UsersReducers = (state = initialState, action) => {
  switch (action.type) {
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
      };
    default:
      return state;
  }
};

export default UsersReducers;
