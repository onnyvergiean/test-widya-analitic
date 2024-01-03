import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loadingBarMiddleware())
);
export default store;
