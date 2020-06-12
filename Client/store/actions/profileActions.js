export const SIGNUP = "SIGNUP";
import {
  SET_EVENT_HISTORY,
  GET_FRIEND_REQUESTS,
  PROFILE_LOADING,
  SET_FRIEND_REQUESTS,
} from "../actions/const";
import { getUser } from "./Usersactions";

//const youripadress = "https://vvat.herokuapp.com";
const youripadress = "http://192.168.56.1:5000";

export const getEventHistory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_LOADING,
    });
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/profile/eventhistory`, {
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
    dispatch({
      type: SET_EVENT_HISTORY,
      payload: {
        events: serverData.eventHistory,
      },
    });
  } catch (err) {
    console.log("error", err.message);
    throw err;
  }
};

export const acceptFriendRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_LOADING });
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
    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
    const friendRequest = getState().profiles.friendRequest.filter((friend) => {
      return friend._id != id;
    });
    dispatch({
      type: SET_FRIEND_REQUESTS,
      payload: {
        friendRequest: friendRequest,
      },
    });
    dispatch(getUser());
    let serverData = await res.json();
    return serverData.msg;
  } catch (err) {
    console.log("error", err.message);
    throw err;
  }
};

export const deleteFriendRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_LOADING });
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
    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
    const friendRequest = getState().profiles.friendRequest.filter((friend) => {
      return friend._id != id;
    });
    dispatch({
      type: SET_FRIEND_REQUESTS,
      payload: {
        friendRequest: friendRequest,
      },
    });
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

    dispatch({
      type: GET_FRIEND_REQUESTS,
      payload: {
        friendRequest: serverData.friendRequests,
      },
    });
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
    dispatch(getUser());
  } catch (err) {
    throw err;
  }
};
