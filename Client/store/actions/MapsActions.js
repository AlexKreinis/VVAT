const youripadress = "https://vvat.herokuapp.com";
import { GET_MAPS } from "./const";
export const maps = () => async (dispatch) => {
  try {
    console.log("entered");
    const res = await fetch(`${youripadress}/api/maps/getmaps`);

    if (!res.ok) {
      const errorResData = await res.json();
      let message = "Something went wrong!";
      if (errorResData && errorResData.errors.length > 0)
        message = errorResData.errors[0].msg;
      throw new Error(message);
    }

    let json = await res.json();
    //console.log(json);
    dispatch({
      type: GET_MAPS,
      payload: { maps: json.data },
    });
    return json;
  } catch (err) {
    throw err;
  }
};
