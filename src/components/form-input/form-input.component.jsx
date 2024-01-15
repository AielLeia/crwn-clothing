import {FormGroup, FormInputLabel, FormInput as StyledFormInput} from "./form-input.styles.jsx";

const FormInput = ({label, ...inputAttribute}) => {
  return (
    <FormGroup>
      <StyledFormInput {...inputAttribute}/>
      {label && (<FormInputLabel className={`${inputAttribute.value.length ? 'shrink' : ''}`}>{label}</FormInputLabel>)}
    </FormGroup>
  )
}

export {FormInput}