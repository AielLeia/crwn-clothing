import { useState } from "react";
import { FormInput } from "../form-input/form-input.component.jsx";
import { Button } from "../button/button.component.jsx";
import {
  SignInButtonContainer,
  SignInContainer,
  SignInTitle,
} from "./sign-in-form.style.jsx";
import { BUTTON_TYPE_CLASSES } from "../button/button.types.js";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action.js";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, email } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
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

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
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
