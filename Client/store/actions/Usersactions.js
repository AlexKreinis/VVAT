export const SIGNUP = "SIGNUP";

import {
  LOGIN,
  REGISTER,
  GET_USER,
  SAVE_PROFILE,
  GET_USER_PROFILE,
} from "../actions/const";
//const youripadress = "https://vvat.herokuapp.com";
//const youripadress = "http://localhost:5000";
const youripadress = "http://192.168.1.35:5000";
//try
export const register = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${youripadress}/api/auth/register`, {
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
    dispatch({
      type: REGISTER,

      payload: { token: json.token },
    });
    return json;
  } catch (err) {
    throw err;
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${youripadress}/api/auth/login`, {
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

    let serverData = await res.json();
    dispatch({
      type: LOGIN,
      payload: { token: serverData.token },
    });
    return serverData;
  } catch (err) {
    throw err;
  }
};

export const getUser = () => async (dispatch, getState) => {
  try {
    const token = getState().users.token;

    const res = await fetch(`${youripadress}/api/auth/getuser`, {
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

    if (typeof serverData.user.profile !== "undefined") {
      dispatch({
        type: GET_USER,
        payload: {
          name: serverData.user.name,
          email: serverData.user.email,
          description: serverData.user.profile.description,
          age: serverData.user.profile.age,
          facebook: serverData.user.profile.facebook,
          events: serverData.user.profile.events,
          friendList: serverData.user.profile.friendList,
          friendRequest: serverData.user.profile.friendRequest,
        },
      });
    } else {
      dispatch({
        type: GET_USER,
        payload: {
          name: serverData.user.name,
          email: serverData.user.email,
          description: "",
          age: "",
          facebook: "",
        },
      });
    }
  } catch (err) {
    throw err;
  }
};

export const findUserProfile = (email) => async (dispatch) => {
  try {
    const res = await fetch(
      `${youripadress}/api/profile/finduserprofile/${email}`
    );

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

export const saveProfile = (data) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;

    const res = await fetch(`${youripadress}/api/profile/saveprofile`, {
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
    let serverData = await res.json();

    dispatch({
      type: SAVE_PROFILE,
      payload: {
        name: serverData.user.name,
        email: serverData.user.email,
        description: serverData.user.profile.description,
        age: serverData.user.profile.age,
        facebook: serverData.user.profile.facebook,
      },
    });
  } catch (err) {
    throw err;
  }
};
