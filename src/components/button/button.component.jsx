import {
  InvertedButton,
  GoogleSignInButton,
  BaseButton,
} from "./button.styles.jsx";
import { BUTTON_TYPE_CLASSES } from "./button.types.js";

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

const Button = ({ children, buttonType, ...buttonAttribute }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...buttonAttribute}>{children}</CustomButton>;
};

export { Button };
