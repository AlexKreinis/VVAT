import {
  SAVE_PROFILE,
  SET_EVENT_HISTORY,
  GET_FRIEND_REQUESTS,
  PROFILE_LOADING,
  GET_PROFILE,
  SET_FRIEND_REQUESTS,
} from "../actions/const";

const initialState = {
  description: "",
  age: "",
  facebook: "",
  rating: "",
  events: [],
  friendList: [],
  friendRequest: [],
  isLoading: true,
  userExists: false,
};
const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        events: [...action.payload.events],
        friendList: [...action.payload.friendList],
        events: [...action.payload.events],
        rating: action.payload.rating,
        facebook: action.payload.facebook,
        age: action.payload.age,
        description: action.payload.description,
        friendRequest: [...action.payload.friendRequest],
      };
    case SET_EVENT_HISTORY:
      return { ...state, events: [...action.payload.events], isLoading: false };
    case GET_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequest: [...action.payload.friendRequest],
        isLoading: false,
      };
    case SET_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequest: [...action.payload.friendRequest],
        isLoading: false,
      };
    case SAVE_PROFILE:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        description: action.payload.description,
        age: action.payload.age,
        facebook: action.payload.facebook,
      };
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
