import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './product-card.style';
import {
  ProductCardButton,
  ProductCardContainer,
  ProductCardFooter,
  ProductCardFooterName,
  ProductCardFooterPrice,
  ProductCardImage,
} from './product-card.style';
import { BUTTON_TYPE_CLASSES } from '@/components/button/button.types';

import { addItemToCart } from '@/store/cart/cart.action';
import { selectCartItems } from '@/store/cart/cart.selector';
import { Product } from '@/store/categories/categories.types';

type ProductCartProps = {
  product: Product;
};

const ProductCard: FC<ProductCartProps> = ({ product }) => {
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
        Add to cart
      </ProductCardButton>
    </ProductCardContainer>
  );
};

export { ProductCard };
