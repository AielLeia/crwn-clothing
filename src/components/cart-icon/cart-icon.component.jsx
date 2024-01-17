import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context.jsx";
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { setIsCartOpen, totalItems } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen((prevState) => !prevState);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{totalItems}</ItemCount>
    </CartIconContainer>
  );
};

export { CartIcon };
