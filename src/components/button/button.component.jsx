import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: 'inverted'
}

const Button = ({ children, buttonType, ...buttonAttribute }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...buttonAttribute}>{children}</button>
  )
}

export { Button }