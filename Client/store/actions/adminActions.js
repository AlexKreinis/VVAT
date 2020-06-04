const youripadress = "http://192.168.56.1:5000";
//const youripadress = "https://vvat.herokuapp.com";

export const adminGetProfile = (email) => async (dispatch, getState) => {
  try {
    const token = getState().users.token;
    const res = await fetch(`${youripadress}/api/admin/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "user-email": email,
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
