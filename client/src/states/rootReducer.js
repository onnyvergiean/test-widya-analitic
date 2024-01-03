import { combineReducers } from 'redux';
import authUserReducer from './auth/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

const rootReducer = combineReducers({
  authUser: authUserReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
