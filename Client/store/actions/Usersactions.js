export const SIGNUP = "SIGNUP";

import { LOGIN, REGISTER, GET_USER, SAVE_PROFILE } from "../actions/const";
const youripadress = "https://vvat.herokuapp.com";
//const youripadress = "http://10.100.102.11:5000";

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
    if (typeof serverData.profile !== "undefined") {
      dispatch({
        type: GET_USER,
        payload: {
          name: serverData.user.name,
          email: serverData.user.email,
          description: serverData.user.profile.description,
        },
      });
    } else {
      dispatch({
        type: GET_USER,
        payload: {
          name: serverData.name,
          email: serverData.email,
          description: "",
        },
      });
    }
  } catch (err) {
    throw err;
  }
};

export const saveProfile = (data) => async (dispatch, getState) => {
  //.log("enterd");

  try {
    const token = getState().users.token;

    const res = await fetch(`${youripadress}/api/auth/saveprofile`, {
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

    dispatch({
      type: SAVE_PROFILE,
      payload: {
        name: data.name,
        email: data.email,
        description: data.description,
      },
    });
  } catch (err) {
    throw err;
  }
};
