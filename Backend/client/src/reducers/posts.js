import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_APPLY,
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case UPDATE_APPLY:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, apply: payload.applied } : post
        ),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postsReducer;
