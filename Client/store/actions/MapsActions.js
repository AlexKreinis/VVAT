//const youripadress = "http://localhost:5000";
const youripadress = "https://vvat.herokuapp.com";

import {
  GET_MAPS,
  SELECTED_MAP_DATA,
  GET_EVENTS,
  DELETE_EVENTS,
  ADD_RATING,
  GET_RATING,
  ADD_ATENDEE,
  GET_ATENDEE,
} from "./const";

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

export const createEvent = (data) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/maps/addevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
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

export const addRating = (rating, eventId) => async (dispatch) => {
  try {
    const res = await fetch(`${youripadress}/api/maps/addrating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ rating: rating, eventId: eventId }),
    });

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }

    let serverData = await res.json();

    dispatch({
      type: ADD_RATING,
      payload: serverData,
    });
  } catch (err) {
    throw err;
  }
};

export const getRating = (eventid) => async (dispatch) => {
  try {
    const res = await fetch(`${youripadress}/api/maps/getratings/${eventid}`);

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }

    let serverData = await res.json();

    dispatch({
      type: GET_RATING,
      payload: serverData.rating,
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

export const deleteEvents = () => (dispatch) => {
  dispatch({
    type: DELETE_EVENTS,
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
    return serverData;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const addAtendee = (name, email, eventid) => async (dispatch) => {
  console.log("here");

  try {
    const res = await fetch(`${youripadress}/api/maps/addatendee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: name, email: email, eventid: eventid }),
    });

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }

    let serverData = await res.json();
    console.log("here", serverData);
    dispatch({
      type: ADD_ATENDEE,
      payload: serverData,
    });
  } catch (err) {
    throw err;
  }
};

export const getAtendees = (eventid) => async (dispatch) => {
  try {
    const res = await fetch(`${youripadress}/api/maps/getatendees/${eventid}`);

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }

    let serverData = await res.json();

    dispatch({
      type: GET_ATENDEE,
      payload: serverData.atendees,
    });
  } catch (err) {
    throw err;
  }
};
