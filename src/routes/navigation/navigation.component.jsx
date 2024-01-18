import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./navigation.styles.jsx";

import CrwnLogo from "../../assets/crown.svg?react";

import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { signOutUser } from "../../utils/firebase/firebase.util.js";
import { CartIcon } from "../../components/cart-icon/cart-icon.component.jsx";
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component.jsx";
import { CartContext } from "../../contexts/cart.context.jsx";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector.js";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>

      <Outlet />
    </>
  );
};

export { Navigation };
