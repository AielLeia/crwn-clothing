import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { CartDropdown } from '../../components/cart-dropdown/cart-dropdown.component.jsx';
import { CartIcon } from '../../components/cart-icon/cart-icon.component.jsx';
import {
  LogoContainer,
  NavLink,
  NavLinks,
  NavigationContainer,
} from './navigation.styles.jsx';

import { selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { signOutStart } from '../../store/user/user.action.js';
import { selectCurrentUser } from '../../store/user/user.selector.js';

import CrwnLogo from '../../assets/crown.svg?react';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutHandler = () => {
    dispatch(signOutStart());
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
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
