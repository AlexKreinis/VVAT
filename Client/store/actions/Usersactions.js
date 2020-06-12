export const SIGNUP = "SIGNUP";

import {
  LOGIN,
  REGISTER,
  GET_USER,
  SET_BAN_STATUS,
  GET_PROFILE,
  LOGOUT,
} from "../actions/const";
//const youripadress = "https://vvat.herokuapp.com";
const youripadress = "http://192.168.56.1:5000";

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

export const getProfile = () => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/profile/`, {
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

    if (serverData.profile) {
      dispatch({
        type: GET_PROFILE,
        payload: {
          description: serverData.profile.description,
          age: serverData.profile.age,
          facebook: serverData.profile.facebook,
          events: serverData.profile.events,
          friendRequest: serverData.profile.friendRequest,
          friendList: serverData.profile.friendList,
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = () => {
  return { type: LOGOUT };
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
    if (serverData.user.profile) {
      dispatch(getProfile());
    }
    dispatch({
      type: GET_USER,
      payload: {
        name: serverData.user.name,
        email: serverData.user.email,
        token: serverData.user.token,
        role: serverData.user.role,
        id: serverData.user._id,
      },
    });
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
