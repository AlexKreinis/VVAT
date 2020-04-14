import { LOGIN, REGISTER } from "../actions/const";
const initialState = {
  token: "",
  userId: "",
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
        token: action.token,
        // userId: action.id,
        // name: action.name,
      };
    default:
      return state;
  }
};

export default UsersReducers;
