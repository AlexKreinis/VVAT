const youripadress = "http://192.168.56.1:5000";
//const youripadress = "https://vvat.herokuapp.com";

import { LOADING_EVENTS, GET_USER_FOR_ADMIN } from "./const";

export const adminGetProfile = (email) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/admin/getuser/${email}`, {
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
    const serverData = await res.json();
    dispatch({
      type: GET_USER_FOR_ADMIN,
      payload: {
        profile: serverData.user,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getallusers = () => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/admin/getallusers/`, {
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

    let listOfAllUsers = await res.json();
    return listOfAllUsers.allUsers;
  } catch (err) {
    throw err;
  }
};

export const getallevents = () => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/admin/getallevents`, {
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
    let listOfAllEvents = await res.json();
    return listOfAllEvents.allEvents;
  } catch (err) {
    console.log(err.message);
  }
};

export const removeevent = (eventID) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(
      `${youripadress}/api/admin/removeevent/${eventID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
      }
    );

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const saveUserProfile = (editedUser) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/admin/saveuserprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(editedUser),
    });

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
    let serverData = await res.json();
    return serverData.user;
  } catch (err) {
    throw err;
  }
};

export const banUser = (email) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/admin/banUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
    let serverData = await res.json();

    return serverData.msg;
  } catch (err) {
    throw err;
  }
};

export const editEvent = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_EVENTS });
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/admin/editevent`, {
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

    return json;
  } catch (err) {
    throw err;
  }
};
