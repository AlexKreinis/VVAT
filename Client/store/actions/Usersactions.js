export const SIGNUP = "SIGNUP";
import { LOGIN, REGISTER } from "../actions/const";
const youripadress = "https://vvat.herokuapp.com";

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
      payload: json.token,
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
