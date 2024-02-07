import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CheckoutItemContainer,
  CheckoutItemImage,
  CheckoutItemImageContainer,
  CheckoutItemName,
  CheckoutItemPrice,
  CheckoutItemQuantity,
  CheckoutItemQuantityArrow,
  CheckoutItemQuantityValue,
  CheckoutItemRemoveButton,
} from './checkout-item.styles';

import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from '@/store/cart/cart.action';
import { selectCartItems } from '@/store/cart/cart.selector';
import { CartItem } from '@/store/cart/cart.types';

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { id, name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, id));
  };

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <CheckoutItemImageContainer>
        <CheckoutItemImage src={imageUrl} alt={name} />
      </CheckoutItemImageContainer>
      <CheckoutItemName>{name}</CheckoutItemName>
      <CheckoutItemQuantity>
        <CheckoutItemQuantityArrow onClick={removeItemHandler}>
          &#10094;
        </CheckoutItemQuantityArrow>
        <CheckoutItemQuantityValue>{quantity}</CheckoutItemQuantityValue>
        <CheckoutItemQuantityArrow onClick={addItemHandler}>
          &#10095;
        </CheckoutItemQuantityArrow>
      </CheckoutItemQuantity>
      <CheckoutItemPrice>{price}</CheckoutItemPrice>
      <CheckoutItemRemoveButton onClick={clearItemHandler}>
        &#10005;
      </CheckoutItemRemoveButton>
    </CheckoutItemContainer>
  );
});

CheckoutItem.displayName = 'CheckoutItem';

export { CheckoutItem };
