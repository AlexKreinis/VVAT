import { LOGIN, REGISTER, GET_USER } from "../actions/const";
const initialState = {
  token: "",
  userId: "",
  name: "",
};

const UsersReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      //console.log(action.email);
      return {
        token: action.payload.token,
        userId: action.payload.email,
      };
    case REGISTER:
      return {
        token: action.token,
        // userId: action.id,
        // name: action.name,
      };

    case GET_USER:
      //console.log(payload);
      return {
        token: state.token,
        userId: action.payload.email,
        name: action.payload.name,
      };
    default:
      return state;
  }
};

export default UsersReducers;
