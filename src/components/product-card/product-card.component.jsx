import "./product-card.style.jsx"
import {BUTTON_TYPE_CLASSES} from "../button/button.component.jsx";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context.jsx";
import {
  ProductCardButton,
  ProductCardContainer,
  ProductCardFooter,
  ProductCardFooterName, ProductCardFooterPrice,
  ProductCardImage
} from "./product-card.style.jsx";

const ProductCard = ({product}) => {
  const {name, price, imageUrl} = product

  const {addItemToCart} = useContext(CartContext)

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <ProductCardImage src={imageUrl} alt={name}/>
      <ProductCardFooter>
        <ProductCardFooterName>{name}</ProductCardFooterName>
        <ProductCardFooterPrice className="price">{price}</ProductCardFooterPrice>
      </ProductCardFooter>

      <ProductCardButton onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to
        card</ProductCardButton>
    </ProductCardContainer>
  )
}

export {ProductCard}