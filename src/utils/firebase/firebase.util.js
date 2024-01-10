import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore"
import {API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET} from "../env-loader/env.util.js";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

async function createUser(userAuth, userDocRef) {
  const {displayName, email} = userAuth
  const createdAt = new Date()

  try {
    await setDoc(userDocRef, {displayName, email, createdAt})
  } catch (error) {
    console.log('error creating the user', error.message)
  }
}

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    await createUser(userAuth, userDocRef);
  }

  return userDocRef
}