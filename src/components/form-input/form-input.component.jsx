import {
  FormGroup,
  FormInputLabel,
  FormInput as StyledFormInput,
} from './form-input.styles.jsx';

const FormInput = ({ label, ...inputAttribute }) => {
  return (
    <FormGroup>
      <StyledFormInput {...inputAttribute} />
      {label && (
        <FormInputLabel $shrink={inputAttribute.value.length}>
          {label}
        </FormInputLabel>
      )}
    </FormGroup>
  );
};

export { FormInput };
