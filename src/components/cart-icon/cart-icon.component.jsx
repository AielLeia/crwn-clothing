import ShoppingIcon from '../../assets/shopping-bag.svg?react'

import "./cart-icon.styles.scss"
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context.jsx";

const CartIcon = () => {
  const {setIsCartOpen, totalItems} = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen((prevState) => !prevState)

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalItems}</span>
    </div>
  )
}

export {CartIcon}