import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
} from './actionTypes';

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: ex.response,
    });
  }
};

//Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: data,
    });
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: ex.response,
    });
  }
};

//Get profile by user ID
export const getProfileByUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: ex.response,
    });
  }
};

//Get profile by profile ID
export const getProfileById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/profile/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: ex.response.data,
    });
  }
};

//Create a profile
export const createProfile = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/profile', formData);
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
    toast.success('Profile created');
    history.push('/dashboard');
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: ex.response.data,
    });
  }
};
//Update a profile
export const updateProfile = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.put('/api/profile', formData);
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
    toast.success('Profile Updated');
    history.push('/dashboard');
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: ex.response.data,
    });
  }
};

//Add skills
export const addSkill = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.put('/api/profile/skills', formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    toast('Skill Added');
    history.push('/dashboard');
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: ex.response.data,
    });
  }
};

//Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.put('/api/profile/education', formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    toast('Education Added');
    history.push('/dashboard');
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: ex.response.data,
    });
  }
};

//Add links
export const addLink = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.put('/api/profile/links', formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    toast('Link Added');
    history.push('/dashboard');
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: ex.response,
    });
  }
};
