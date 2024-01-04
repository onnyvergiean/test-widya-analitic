import ActionTypes from '../ActionType';

const isPreloadReducer = (isPreload = true, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_IS_PRELOAD:
      return action.payload.isPreload;
    default:
      return isPreload;
  }
};

export default isPreloadReducer;
