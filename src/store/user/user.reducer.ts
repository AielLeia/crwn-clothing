import { UnknownAction } from 'redux';

import {
  setCurrentUser,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from './user.action';

import { UserData } from '../../utils/firebase/firebase.util';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userReducer = (
  state = INITIAL_STATE,
  action: UnknownAction
): UserState => {
  if (signInSuccess.match(action) || setCurrentUser.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
      error: null,
    };
  }

  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return {
      ...state,
      currentUser: null,
      isLoading: false,
      error: action.payload,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
      isLoading: false,
      error: null,
    };
  }

  return state;
};

export { userReducer };
