import axios from "../helpers/axios";
import { authConstant } from "./constants";

export const login = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: authConstant.LOGIN_REQUEST,
    });
    try {
      const res = await axios.post("/auth/login", formData);

      if (res.data.errorCode) {
        dispatch({
          type: authConstant.LOGIN_FAILURE,
          payload: res.data,
        });
      } else {
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: authConstant.LOGOUT_SUCCESS,
    });
  };
};
