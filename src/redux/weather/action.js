import axios from "axios";
export const actionTypes = {
  SET_WEATHER: "SET_WEATHER",
  SET_WEATHER_SUCCESS: "SET_WEATHER_SUCCESS",
  SET_WEATHER_ERROR: "SET_WEATHER_ERROR",
};
export const actionWeather = {
  getWeather: (value) => {
    return async (dispatch) => {
      dispatch({ type: actionTypes.SET_WEATHER });
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&lang=ru&APPID=0253feb4b272e9d80b20818a745b1ec4`
    )
        .then((res) => {
          dispatch({
            type: actionTypes.SET_WEATHER_SUCCESS,
            payload: res.data.list,
          });
        })
        .catch((err) => {
          console.log(err.response, err);
          dispatch({
            type: actionTypes.SET_WEATHER_ERROR,
            payload: "Not found",
          });
        });
    };
  },
};
