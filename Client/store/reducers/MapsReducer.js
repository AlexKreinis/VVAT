import { GET_MAPS } from "../actions/const";
import { ActionSheetIOS } from "react-native";

const initialState = {
  sportsCenters: [],
};

const MapsReducers = (state = initialState, action) => {
  switch (action.type) {
    //complete cases

    case GET_MAPS:
      return { sportsCenters: [...action.payload] };
    default:
      return state;
  }
};

export default MapsReducers;
