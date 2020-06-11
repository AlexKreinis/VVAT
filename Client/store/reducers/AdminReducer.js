import { GET_USER_FOR_ADMIN } from "../actions/const";
const initialState = {
  selectedUser: {},
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FOR_ADMIN:
      return {
        ...state,
        selectedUser: { ...action.payload.profile },
      };
    default:
      return state;
  }
};

export default AdminReducer;
