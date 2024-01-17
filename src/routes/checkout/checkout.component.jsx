import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context.jsx";
import { CheckoutItem } from "../../components/checkout-item/checkout-item.component.jsx";
import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutHeaderBlock,
  CheckoutTotal,
} from "./checkout.styles.jsx";

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <CheckoutHeaderBlock>
          <span>Product</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Description</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Quantity</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Price</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Remove</span>
        </CheckoutHeaderBlock>
      </CheckoutHeader>
      {cartItems.map((item) => {
        return <CheckoutItem cartItem={item} key={item.id} />;
      })}
      <CheckoutTotal>Total: ${totalPrice}</CheckoutTotal>
    </CheckoutContainer>
  );
};

export { Checkout };
