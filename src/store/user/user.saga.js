import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from './user.action.js';
import { USER_ACTION_TYPES } from './user.types.js';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from '../../utils/firebase/firebase.util.js';

function* getSnapshotFromUserAuth(userAuth, additionalDetails = {}) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signUpWithEmailAndPassword({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user, { displayName });
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

function* onEmailSignUpStart() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
    signUpWithEmailAndPassword
  );
}

function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onSignOutStart),
  ]);
}
