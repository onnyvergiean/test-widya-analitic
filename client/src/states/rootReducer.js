import { combineReducers } from 'redux';
import authUserReducer from './auth/reducer';
import usersReducer from './users/reducer';
import isPreloadReducer from './isPreload/reducer';
import productsReducer from './products/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

const rootReducer = combineReducers({
  authUser: authUserReducer,
  users: usersReducer,
  products: productsReducer,
  isPreload: isPreloadReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
