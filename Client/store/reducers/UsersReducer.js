import { LOGIN, REGISTER, GET_USER } from "../actions/const";
const initialState = {
  token: "",
  email: "",
  name: "",
  profile: {},
};

const UsersReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload.token,
        userId: action.payload.email,
      };
    case REGISTER:
      return {
        token: action.token,
      };

    case GET_USER:
      return {
        token: state.token,
        email: action.payload.email,
        name: action.payload.name,
        profile: action.payload.profile,
      };
    default:
      return state;
  }
};

export default UsersReducers;
