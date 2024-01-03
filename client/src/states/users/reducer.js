import ActionTypes from '../ActionType';

export default function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ActionTypes.REGISTER_USERS:
      return action.payload.users;
    default:
      return users;
  }
}
