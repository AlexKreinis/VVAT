//const youripadress = "https://vvat.herokuapp.com";
const youripadress = "http://192.168.56.1:5000";

import {
  GET_MAPS,
  SELECTED_MAP_DATA,
  GET_EVENTS,
  DELETE_EVENTS,
  ADD_ATENDEE,
  LOADING_EVENTS,
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
    dispatch({ type: LOADING_EVENTS });
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
    dispatch(getEvents(data.lat, data.lon));
    return json;
  } catch (err) {
    throw err;
  }
};

export const addRating = (rating, eventId) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/maps/addrating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
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
    return serverData;
  } catch (err) {
    throw err;
  }
};

export const getRating = (eventid) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/maps/getratings/${eventid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
    });

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }

    let serverData = await res.json();
    return serverData.rating;
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
    dispatch({ type: LOADING_EVENTS });
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

export const addAtendee = (eventid) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/maps/addatendee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ eventid: eventid }),
    });

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }

    let serverData = await res.json();
    console.log(serverData);
    dispatch({
      type: ADD_ATENDEE,
      payload: { atendees: serverData.atendeeList },
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
      type: ADD_ATENDEE,
      payload: { atendees: serverData.atendees },
    });
  } catch (err) {
    throw err;
  }
};
