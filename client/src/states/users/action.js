import { hideLoading, showLoading } from 'react-redux-loading-bar';
import ActionTypes from '../ActionType';
import api from '../../utils/api';

function receiveUsersActionCreator(users) {
  return {
    type: ActionTypes.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password, gender }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password, gender });
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
    dispatch(hideLoading());
  };
}

export { receiveUsersActionCreator, asyncRegisterUser };
