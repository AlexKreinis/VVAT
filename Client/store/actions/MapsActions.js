const youripadress = "https://vvat.herokuapp.com";
import { GET_MAPS, SELECTED_MAP_DATA } from "./const";
export const maps = () => async (dispatch) => {
  try {
    const res = await fetch(`${youripadress}/api/maps/getmaps`);
    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
    let serverData = await res.json();
    dispatch({
      type: GET_MAPS,
      payload: serverData.data,
    });
  } catch (err) {
    throw err;
  }
};

export const selectedMapsDetails = (marker) => (dispatch) => {
  dispatch({
    type: SELECTED_MAP_DATA,
    payload: { name: marker["Name"], lat: marker["lat"], lon: marker["lon"] },
  });
};