import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.util.js"
import {SignUpForm} from "../../components/sign-up-form/sign-up-form.component.jsx";


const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogleUser}>Sign in with google Popup</button>
      <SignUpForm />
    </div>
  )
}

export {SignIn}