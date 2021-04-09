import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOAD_USER_ERROR,
  LOGOUT,
} from "./actionTypes";
import setAuthToken from "../services/httpServices";

//Register User
export const register = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/users`, data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (ex) {
    console.log(ex.response.data);
    dispatch({
      type: REGISTER_FAIL,
      payload: ex.response.data,
    });
    return false;
  }
};

//Login, get token and apply token to the axios headers
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/auth", { email, password });
    console.log(data.token);
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: data.token,
    });
    dispatch(getCurrentUser());
    return true;
  } catch (ex) {
    dispatch({
      type: LOGIN_FAIL,
      payload: ex.response,
    });
    return false;
  }
};

//Get current users detailes for authentication
export const getCurrentUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const { data } = await axios.get("/api/users/me");
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } catch (ex) {
    dispatch({
      type: LOAD_USER_ERROR,
      payload: ex.response.data,
    });
  }
};

//Log out, and clear token
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
