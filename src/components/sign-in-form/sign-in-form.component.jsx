import './sign-in-form.style.scss'

import {useState} from "react";
import {FormInput} from "../form-input/form-input.component.jsx";
import {Button} from "../button/button.component.jsx";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.util.js";

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { password, email} = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields()
    } catch (e) {
      if (e.code === "auth/invalid-credential") {
        alert("Invalid credential", e)
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target

    setFormFields((prevFormFields) => ({...prevFormFields, [name]: value}))
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user)
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>


        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">Google sign in</Button>
        </div>
      </form>
    </div>
  );
}

export {SignInForm}