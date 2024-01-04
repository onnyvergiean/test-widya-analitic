import ActionTypes from '../ActionType';

const usersReducer = (users = [], action = {}) => {
  switch (action.type) {
    case ActionTypes.REGISTER_USERS:
      return action.payload.users;
    default:
      return users;
  }
};

export default usersReducer;
