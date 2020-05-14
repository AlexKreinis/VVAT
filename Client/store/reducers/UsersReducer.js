import {
  LOGIN,
  REGISTER,
  GET_USER,
  SAVE_PROFILE,
  GET_USER_PROFILE,
} from "../actions/const";
const initialState = {
  token: "",
  email: "",
  name: "",
  description: "",
  age: "",
  facebook: "",
  otherUser: {
    other_email: "",
    other_name: "",
    other_description: "",
    other_age: "",
    other_facebook: "",
  },
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
      //console.log("enttt", payload);
      return {
        token: state.token,
        email: action.payload.email,
        name: action.payload.name,
        description: action.payload.description,
        age: action.payload.age,
        facebook: action.payload.facebook,
      };
    case SAVE_PROFILE:
      // console.log(payload);
      return {};
    case GET_USER_PROFILE:
      // console.log(payload);
      return {
        ...state,
        otherUser: {
          other_email: action.payload.email,
          other_name: action.payload.name,
          other_description: action.payload.description,
          other_age: action.payload.age,
          other_facebook: action.payload.facebook,
        },
      };
    default:
      return state;
  }
};

export default UsersReducers;
