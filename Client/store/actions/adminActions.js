const youripadress = "http://192.168.1.13:5000";
//const youripadress = "https://vvat.herokuapp.com";

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
    let serverData = await res.json();
    return serverData.user;
  } catch (err) {
    console.log(err.message);
  }
};

export const getallusers = () => async () => {
  try {
    const res = await fetch(`${youripadress}/api/admin/getallusers/`);
    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
    console.log("getAllUsers action after the if");
    let listOfAllUsers = await res.json();
    return listOfAllUsers.allUsers;
  } catch (err) {
    throw err;
  }
};

export const getallevents = () => async () => {
  try {
    const res = await fetch(`${youripadress}/api/admin/getallevents`);

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

export const removeevent = () => async () => {
  try {
    const res = await fetch(`${youripadress}/api/admin/removeevent/`);

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }
    console.log("res in admin actions-----------", res);
  } catch (err) {
    console.log(err.message);
  }
};
