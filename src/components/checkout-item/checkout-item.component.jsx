import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context.jsx";
import {
  CheckoutItemContainer,
  CheckoutItemImage,
  CheckoutItemImageContainer,
  CheckoutItemName,
  CheckoutItemPrice,
  CheckoutItemQuantity,
  CheckoutItemQuantityArrow,
  CheckoutItemQuantityValue,
  CheckoutItemRemoveButton
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({cartItem}) => {
  const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext)
  const {id, name, imageUrl, price, quantity} = cartItem

  const clearItemHandler = () => {
    clearItemFromCart(id)
  }

  const addItemHandler = () => addItemToCart(cartItem)
  const removeItemHandler = () => removeItemFromCart(cartItem)

  return (
    <CheckoutItemContainer>
      <CheckoutItemImageContainer>
        <CheckoutItemImage src={imageUrl} alt={name}/>
      </CheckoutItemImageContainer>
      <CheckoutItemName>{name}</CheckoutItemName>
      <CheckoutItemQuantity>
        <CheckoutItemQuantityArrow onClick={removeItemHandler}>&#10094;</CheckoutItemQuantityArrow>
        <CheckoutItemQuantityValue>{quantity}</CheckoutItemQuantityValue>
        <CheckoutItemQuantityArrow onClick={addItemHandler}>&#10095;</CheckoutItemQuantityArrow>
      </CheckoutItemQuantity>
      <CheckoutItemPrice>{price}</CheckoutItemPrice>
      <CheckoutItemRemoveButton onClick={clearItemHandler}>&#10005;</CheckoutItemRemoveButton>
    </CheckoutItemContainer>
  )
}

export {CheckoutItem}