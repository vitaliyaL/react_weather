import { actionTypes } from "./action";

const initialState = {
  weather: [],
  success: false,
  loading: false,
  error: false,
};
export const reducerWeather = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_WEATHER:
      return {
        ...state,
        weather: [],
        success: false,
        loading: true,
        error: false,
      };
    case actionTypes.SET_WEATHER_SUCCESS:
      return {
        ...state,
        weather: payload,
        success: true,
        loading: false,
        error: false,
      };
    case actionTypes.SET_WEATHER_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
