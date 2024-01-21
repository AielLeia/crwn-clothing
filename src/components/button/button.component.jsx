import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles.jsx';

import { BUTTON_TYPE_CLASSES } from './button.types.js';

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

const Button = ({ children, buttonType, isLoading, ...buttonAttribute }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...buttonAttribute}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export { Button };
