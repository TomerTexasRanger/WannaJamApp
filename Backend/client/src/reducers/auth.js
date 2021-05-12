import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOAD_USER_ERROR,
  LOGOUT,
} from "../actions/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      toast.success(`User Registered Successfully!, Welcome ${payload.name}`);

      return {
        ...state,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOAD_USER_ERROR:
    case LOGOUT:
    case LOGIN_FAIL:
      toast.error(payload);
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
