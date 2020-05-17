export const SIGNUP = "SIGNUP";
import {} from "../actions/const";

//const youripadress = "https://vvat.herokuapp.com";
const youripadress = "http://192.168.56.1:5000";

const handleRes = async (res) => {
  const errorResData = await res.json();
  let message = "Something went wrong!";
  if (errorResData && errorResData.errors.length > 0)
    message = errorResData.errors[0].msg;
  throw new Error(message);
};

export const acceptFriendRequest = (id) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/profile/acceptfriendrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) handleRes(res);
    let serverData = await res.json();
    return serverData.msg;
  } catch (err) {
    console.log("error", err.message);
    throw err;
  }
};

export const deleteFriendRequest = (id) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/profile/deletefriendrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) handleRes(res);
    let serverData = await res.json();
    return serverData.msg;
  } catch (err) {
    console.log("error", err.message);
    throw err;
  }
};

export const getFriendRequests = () => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/profile/getfriendrequests`, {
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
    return serverData.friendRequests;
  } catch (err) {
    console.log("error", err.message);
    throw err;
  }
};

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
