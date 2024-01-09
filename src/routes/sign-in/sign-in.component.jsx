import {signInWithGooglePopup} from "../../utils/firebase/firebase.util.js"

const SignIn = () => {
  const logGoogleUser = async () => {
    const reponse = await signInWithGooglePopup();
    console.log(reponse)
  }

  return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogleUser}>Sign in with google Popup</button>
    </div>
  )
}

export {SignIn}