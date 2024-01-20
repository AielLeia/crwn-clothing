import { USER_ACTION_TYPES } from './user.types.js';

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
        error: null,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
        error: payload,
      };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
        error: payload,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export { userReducer };
