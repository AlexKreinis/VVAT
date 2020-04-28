export const SIGNUP = "SIGNUP";

import { LOGIN, REGISTER, GET_USER } from "../actions/const";
const youripadress = "https://vvat.herokuapp.com";
//const youripadress = "http://localhost:5000";

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
      payload: { token: serverData.token, email: data.email },
    });
    //console.log("hi", serverData);

    return serverData;
  } catch (err) {
    throw err;
  }
};

// export const getuser = (data) => async (dispatch) => {
//   try {
//     const res = await fetch(`${youripadress}/api/auth/getuser`);

//     if (!res.ok) {
//       // console.log("hi", serverData);

//       const errorResData = await res.json();
//       let message = "Something went wrong!";
//       if (errorResData && errorResData.errors.length > 0)
//         message = errorResData.errors[0].msg;
//       throw new Error(message);
//     }

//     let serverData = await res.json();
//     console.log("hi", serverData);
//     dispatch({
//       type: GET_USER,
//       payload: { name: serverData.user.name, email: serverData.user.email },
//     });

//     return serverData;
//   } catch (err) {
//     throw err;
//   }
// };
