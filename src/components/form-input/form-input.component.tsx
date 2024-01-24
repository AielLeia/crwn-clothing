import { FC, InputHTMLAttributes } from 'react';

import {
  FormGroup,
  FormInputLabel,
  FormInput as StyledFormInput,
} from './form-input.styles';

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...inputAttribute }) => {
  return (
    <FormGroup>
      <StyledFormInput {...inputAttribute} />
      {label && (
        <FormInputLabel
          $shrink={Boolean(
            inputAttribute.value &&
              typeof inputAttribute.value === 'string' &&
              inputAttribute.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </FormGroup>
  );
};

export { FormInput };
