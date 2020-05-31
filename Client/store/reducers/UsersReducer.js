import { LOGIN, REGISTER, GET_USER } from "../actions/const";
const initialState = {
  token: "",
  email: "",
  name: "",
  role: "",
  id: "",
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
        role: action.payload.role,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

export default UsersReducers;
