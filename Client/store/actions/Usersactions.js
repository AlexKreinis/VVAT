import axios from "axios";

export const SIGNUP = "SIGNUP";

export const register = () => async (dispatch) => {
  try {
    //console.log("entered");
    const res = await fetch("http://10.100.102.3:5000/api/auth/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        test: "test",
      }),
    });
    let json = await res.json();
    console.log(json);
    // dispatch({
    //   type: REGISTER_SUCCESS,
    //   payload: res.data
    // });
    //dispatch(loadUser());
  } catch (err) {
    console.log(err);
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    // dispatch({ type: REGISTER_FAIL });
  }
};
