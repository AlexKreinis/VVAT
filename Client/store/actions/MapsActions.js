const youripadress = "https://vvat.herokuapp.com";
//const youripadress = "http://192.168.56.1:5000";

import { GET_MAPS, SELECTED_MAP_DATA, GET_EVENTS } from "./const";

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

export const createEvent = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${youripadress}/api/maps/addevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }

    let json = await res.json();
    // dispatch({
    //   type: REGISTER,
    //   payload: json.token,
    // });
    // return json;
    return json;
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

export const getEvents = (lat, lon) => async (dispatch) => {
  try {
    const res = await fetch(`${youripadress}/api/maps/getevents/${lat}/${lon}`);
    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
    let serverData = await res.json();
    dispatch({
      type: GET_EVENTS,
      payload: serverData.events,
    });
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
