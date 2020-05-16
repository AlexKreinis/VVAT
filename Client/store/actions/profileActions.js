export const SIGNUP = "SIGNUP";

import {
  LOGIN,
  REGISTER,
  GET_USER,
  SAVE_PROFILE,
  GET_USER_PROFILE,
} from "../actions/const";
//const youripadress = "https://vvat.herokuapp.com";
const youripadress = "http://192.168.0.86:5000";

export const sendFriendRequest = (id) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/profile/sendfriendrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
  } catch (err) {
    throw err;
  }
};
