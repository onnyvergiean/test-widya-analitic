import { hideLoading, showLoading } from 'react-redux-loading-bar';

import ActionTypes from '../ActionType';
import api from '../../utils/api';

const setAuthUserActionCreator = (authUser) => ({
  type: ActionTypes.SET_AUTH_USER,
  payload: { authUser },
});

const unsetAuthUserActionCreator = () => ({
  type: ActionTypes.UNSET_AUTH_USER,
});

const asyncSetAuthUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };

const asyncUnsetAuthUser = () => async (dispatch) => {
  try {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  } catch (error) {
    console.error('Error during logout:', error.message);
  }
};
export {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
