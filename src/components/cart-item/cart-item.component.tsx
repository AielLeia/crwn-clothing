import { FC, memo } from 'react';

import {
  CartItemContainer,
  CartItemDetails,
  CartItemDetailsName,
  CartItemDetailsPrice,
  CartItemImg,
} from './cart-item.styles';

import { CartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: CartItem;
};

const CartItemComponent: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <CartItemContainer className="cart-item-container">
      <CartItemImg src={imageUrl} alt={name} />
      <CartItemDetails className="item-details">
        <CartItemDetailsName className="name">{name}</CartItemDetailsName>
        <CartItemDetailsPrice className="price">
          {quantity} x ${price}
        </CartItemDetailsPrice>
      </CartItemDetails>
    </CartItemContainer>
  );
});

CartItemComponent.displayName = 'CartItemComponent';

export { CartItemComponent };
