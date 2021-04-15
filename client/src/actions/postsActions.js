import axios from 'axios';
import { toast } from 'react-toastify';
import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_APPLY,
} from './actionTypes';

//Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: data,
    });
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: ex.response,
    });
  }
};

//Apply to post
export const applyToPost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/posts/apply/${id}`);
    dispatch({
      type: UPDATE_APPLY,
      payload: { id, applied: data },
    });
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: ex.response,
    });
  }
};

//Remove Apply
export const unapplyToPost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/posts/unapply/${id}`);
    dispatch({
      type: UPDATE_APPLY,
      payload: { id, applied: data },
    });
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: ex.response,
    });
  }
};

//Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    toast.success('Post has been deleted');
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: ex.response,
    });
  }
};

//Add Post
export const addPost = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/posts`, formData);
    dispatch({
      type: ADD_POST,
      payload: data,
    });
    toast.success('Post Created');
    history.push('/posts');
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: ex.response,
    });
  }
};

//Get Post
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: data,
    });
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: ex.response,
    });
  }
};
