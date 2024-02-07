import { AuthenticationContainer } from './authentication.style';
import { SignInForm } from '@/components/sign-in-form/sign-in-form.component';
import { SignUpForm } from '@/components/sign-up-form/sign-up-form.component';

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
