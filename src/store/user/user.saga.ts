import { User } from 'firebase/auth';
import { all, call, put, takeLatest } from 'typed-redux-saga';

import {
  CHECK_USER_SESSION,
  EMAIL_SIGN_IN_START,
  EMAIL_SIGN_UP_START,
  GOOGLE_SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_OUT_START,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from './user.reducer';

import {
  AdditionalInformation,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from '../../utils/firebase/firebase.util';

type SignInPayload = {
  type: typeof SIGN_IN_SUCCESS;
  payload: {
    email: string;
    password: string;
  };
};

type SignUpPayload = {
  type: typeof SIGN_IN_SUCCESS;
  payload: {
    email: string;
    password: string;
    displayName: string;
  };
};

function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signInWithEmailAndPassword({
  payload: { email, password },
}: SignInPayload) {
  try {
    const { user } = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signUpWithEmailAndPassword({
  payload: { email, password, displayName },
}: SignUpPayload) {
  try {
    const { user } = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield* call(getSnapshotFromUserAuth, user, { displayName });
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;

    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* onCheckUserSession() {
  yield* takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

function* onGoogleSignInStart() {
  yield* takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
  yield* takeLatest(EMAIL_SIGN_IN_START, signInWithEmailAndPassword);
}

function* onEmailSignUpStart() {
  yield* takeLatest(EMAIL_SIGN_UP_START, signUpWithEmailAndPassword);
}

function* onSignOutStart() {
  yield* takeLatest(SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onSignOutStart),
  ]);
}
