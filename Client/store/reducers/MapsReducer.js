import {
  GET_MAPS,
  SELECTED_MAP_DATA,
  GET_EVENTS,
  DELETE_EVENTS,
  ADD_RATING,
  GET_RATING,
  ADD_ATENDEE,
  LOADING_EVENTS,
} from "../actions/const";

const initialState = {
  sportsCenters: [],
  selectedMapData: { lat: "", lon: "", name: "" },
  events: [],
  selectedAtendees: [],
  isLoading: true,
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
    case GET_EVENTS:
      return { ...state, events: [...action.payload], isLoading: false };
    case DELETE_EVENTS:
      return { ...state, events: [] };
    case ADD_ATENDEE:
      return { ...state, selectedAtendees: [...action.payload.atendees] };
    case LOADING_EVENTS:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default MapsReducers;
