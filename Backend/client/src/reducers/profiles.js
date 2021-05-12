import { toast } from 'react-toastify';
import {
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

const profilesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      toast(payload);
      return {
        ...state,
        profile: null,
        error: { payload },
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default profilesReducer;
