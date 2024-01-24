import { ButtonHTMLAttributes, FC } from 'react';

import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles';

import { BUTTON_TYPE_CLASSES } from './button.types';

const getButton = (
  buttonType = BUTTON_TYPE_CLASSES.base
): typeof BaseButton => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...buttonAttribute
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...buttonAttribute}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export { Button };
