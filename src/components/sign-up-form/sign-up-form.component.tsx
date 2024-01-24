import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../button/button.component';
import { FormInput } from '../form-input/form-input.component';
import { SignUpContainer, SignUpTitle } from './sign-up-form.style';

import { emailSignUpStart } from '../../store/user/user.action';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { confirmPassword, displayName, password, email } = formFields;
  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    try {
      dispatch(emailSignUpStart(email, password, displayName));
      resetFormFields();
    } catch (e) {
      if ((e as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create, email already in use');
      }
      console.error('User creation a encountered an error', e);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };

  return (
    <SignUpContainer>
      <SignUpTitle>Don&apos;t have an account ?</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </SignUpContainer>
  );
};

export { SignUpForm };
