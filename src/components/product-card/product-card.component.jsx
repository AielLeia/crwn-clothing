import { useDispatch, useSelector } from 'react-redux';

import './product-card.style.jsx';
import {
  ProductCardButton,
  ProductCardContainer,
  ProductCardFooter,
  ProductCardFooterName,
  ProductCardFooterPrice,
  ProductCardImage,
} from './product-card.style.jsx';

import { addItemToCart } from '../../store/cart/cart.action.js';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import { BUTTON_TYPE_CLASSES } from '../button/button.types.js';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, price, imageUrl } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <ProductCardImage src={imageUrl} alt={name} />
      <ProductCardFooter>
        <ProductCardFooterName>{name}</ProductCardFooterName>
        <ProductCardFooterPrice className="price">
          {price}
        </ProductCardFooterPrice>
      </ProductCardFooter>

      <ProductCardButton
        onClick={addProductToCart}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add to card
      </ProductCardButton>
    </ProductCardContainer>
  );
};

export { ProductCard };
