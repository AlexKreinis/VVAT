export const SIGNUP = "SIGNUP";

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
    return json;
    // dispatch({
    //   type: REGISTER_SUCCESS,
    //   payload: res.data
    // });
    //dispatch(loadUser());
  } catch (err) {
    throw err;
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    // dispatch({ type: REGISTER_FAIL });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    console.log("entered");
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

    let json = await res.json();
    return json;
    // dispatch({
    //   type: REGISTER_SUCCESS,
    //   payload: res.data
    // });
    // dispatch(loadUser());
  } catch (err) {
    throw err;
  }
};
