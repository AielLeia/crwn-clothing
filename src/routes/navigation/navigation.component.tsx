import CrwnLogo from '@/assets/crown.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import {
  LogoContainer,
  NavLink,
  NavLinks,
  NavigationContainer,
} from './navigation.styles';
import { CartDropdown } from '@/components/cart-dropdown/cart-dropdown.component';
import { CartIcon } from '@/components/cart-icon/cart-icon.component';

import { selectIsCartOpen } from '@/store/cart/cart.selector';
import { signOutStart } from '@/store/user/user.reducer';
import { selectCurrentUser } from '@/store/user/user.selector';

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
            <NavLink as="span" onClick={signOutHandler} to={''}>
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

export default Navigation;
