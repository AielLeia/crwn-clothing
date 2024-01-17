import {
  CartItemContainer,
  CartItemDetails,
  CartItemDetailsName,
  CartItemDetailsPrice,
  CartItemImg,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
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
};

export { CartItem };
