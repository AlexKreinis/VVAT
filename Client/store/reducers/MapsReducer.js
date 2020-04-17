import { GET_MAPS, SELECTED_MAP_DATA } from "../actions/const";
import { ActionSheetIOS } from "react-native";

const initialState = {
  sportsCenters: [],
  selectedMapData: { lat: "", lon: "", name: "" },
};

const MapsReducers = (state = initialState, action) => {
  switch (action.type) {
    //complete cases

    case GET_MAPS:
      return { ...state, sportsCenters: [...action.payload] };
    case SELECTED_MAP_DATA:
      return {
        ...state,
        selectedMapData: {
          lat: action.payload.lat,
          lon: action.payload.lon,
          name: action.payload.name,
        },
      };
    default:
      return state;
  }
};

export default MapsReducers;
