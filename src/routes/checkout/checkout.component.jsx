import { useSelector } from 'react-redux';

import { CheckoutItem } from '../../components/checkout-item/checkout-item.component.jsx';
import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutHeaderBlock,
  CheckoutTotal,
} from './checkout.styles.jsx';

import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector.js';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

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
      <CheckoutTotal>Total: ${cartTotal}</CheckoutTotal>
    </CheckoutContainer>
  );
};

export { Checkout };
