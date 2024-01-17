import { useState } from "react";
import { FormInput } from "../form-input/form-input.component.jsx";
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.component.jsx";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.util.js";
import {
  SignInButtonContainer,
  SignInContainer,
  SignInTitle,
} from "./sign-in-form.style.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, email } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password,
      );
      resetFormFields();
    } catch (e) {
      if (e.code === "auth/invalid-credential") {
        alert("Invalid credential", e);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <SignInContainer>
      <SignInTitle>Already have an account ?</SignInTitle>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <SignInButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google sign in
          </Button>
        </SignInButtonContainer>
      </form>
    </SignInContainer>
  );
};

export { SignInForm };
