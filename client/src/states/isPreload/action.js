import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import ActionTypes from '../ActionType';
import { setAuthUserActionCreator } from '../auth/action';

const setIsPreloadActionCreator = (isPreload) => ({
  type: ActionTypes.SET_IS_PRELOAD,
  payload: { isPreload },
});

const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    dispatch(setAuthUserActionCreator(null));
  } finally {
    dispatch(setIsPreloadActionCreator(false));
  }
  dispatch(hideLoading());
};

export { setIsPreloadActionCreator, asyncPreloadProcess };
