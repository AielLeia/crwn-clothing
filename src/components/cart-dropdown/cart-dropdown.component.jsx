import {Button} from "../button/button.component.jsx";
import {CartItem} from "../cart-item/cart-item.component.jsx";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context.jsx";
import {useNavigate} from "react-router-dom";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const {cartItems} = useContext(CartContext)
  const navigate = useNavigate()

  const gotoToCheckoutHandler = () => navigate("/checkout")

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
            : <EmptyMessage>Your cart is empty</EmptyMessage>
        }
      </CartItems>
      <Button onClick={gotoToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export {CartDropdown}