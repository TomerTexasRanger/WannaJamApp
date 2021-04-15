import { combineReducers } from 'redux';
import authReducer from './auth';
import postsReducer from './posts';
import profilesReducer from './profiles';

export default combineReducers({
  authReducer,
  profilesReducer,
  postsReducer,
});
