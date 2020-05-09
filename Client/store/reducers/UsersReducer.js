import { LOGIN, REGISTER, GET_USER, SAVE_PROFILE } from "../actions/const";
const initialState = {
  token: "",
  email: "",
  name: "",
  description: "",
};

const UsersReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload.token,
      };
    case REGISTER:
      // console.log(action.payload);
      return {
        token: action.payload.token,
      };

    case GET_USER:
      return {
        token: state.token,
        email: action.payload.email,
        name: action.payload.name,
        description: action.payload.description,
      };
    case SAVE_PROFILE:
      // console.log(payload);
      return {
        token: state.token,
        email: action.payload.email,
        name: action.payload.name,
        description: action.payload.description,
      };
    default:
      return state;
  }
};

export default UsersReducers;
