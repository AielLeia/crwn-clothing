import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserData } from '../../utils/firebase/firebase.util';

export type UserState = {
  currentUser: UserData | null;
  isLoading: boolean;
  error: Error | null;
};

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

function setUserState(state: UserState, user: UserData) {
  state.currentUser = user;
  state.isLoading = false;
  state.error = null;
}

function setErrorState(state: UserState, error: Error) {
  state.currentUser = null;
  state.isLoading = false;
  state.error = error;
}

function setDefaultState(state: UserState) {
  state.currentUser = null;
  state.isLoading = false;
  state.error = null;
}

function fetchingState(state: UserState) {
  state.isLoading = true;
}

const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    signInSuccess(state, action: PayloadAction<UserData & { id: string }>) {
      setUserState(state, action.payload);
    },
    signInFailed(state, action: PayloadAction<Error>) {
      setErrorState(state, action.payload);
    },
    signUpFailed(state, action: PayloadAction<Error>) {
      setErrorState(state, action.payload);
    },
    signOutFailed(state, action: PayloadAction<Error>) {
      setErrorState(state, action.payload);
    },
    signOutSuccess(state) {
      setDefaultState(state);
    },
    googleSignInStart(state) {
      fetchingState(state);
    },
    signOutStart(state) {
      fetchingState(state);
    },
    emailSignInStart(
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ignore: PayloadAction<{ email: string; password: string }>
    ) {
      fetchingState(state);
    },
    emailSignUpStart(
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ignore: PayloadAction<{
        email: string;
        password: string;
        displayName: string;
      }>
    ) {
      fetchingState(state);
    },
    checkUserSession(state) {
      fetchingState(state);
    },
  },
});

export const userReducer = userSlice.reducer;

export const SIGN_OUT_START = 'user/signOutStart';
export const GOOGLE_SIGN_IN_START = 'user/googleSignInStart';
export const EMAIL_SIGN_IN_START = 'user/emailSignInStart';
export const EMAIL_SIGN_UP_START = 'user/emailSignUpStart';
export const CHECK_USER_SESSION = 'user/checkUserSession';
export const SIGN_IN_SUCCESS = 'user/signInSuccess';

export const {
  signOutSuccess,
  signInSuccess,
  signOutFailed,
  signUpFailed,
  signInFailed,
  googleSignInStart,
  signOutStart,
  emailSignInStart,
  emailSignUpStart,
  checkUserSession,
} = userSlice.actions;
