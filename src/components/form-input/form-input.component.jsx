import './form-input.styles.scss'

const FormInput = ({label, ...inputAttribute}) => {
  return (
    <div className="group">
      <input className="form-input" {...inputAttribute}/>
      {label && (<label className={`${inputAttribute.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>)}
    </div>
  )
}

export {FormInput}