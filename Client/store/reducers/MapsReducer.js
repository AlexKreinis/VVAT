import { GET_MAPS } from "../actions/const";

const initialState = {
  sportsCenters: [],
};

const MapsReducers = (state = initialState, action) => {
  switch (action.type) {
    //complete cases

    case GET_MAPS:
      console.log(action.payloads.maps);
      return { sportsCenters: action.payload.maps };
    default:
      return state;
  }
};

export default MapsReducers;
