import "./navigation.styles.scss"

import CrwnLogo from '../../assets/crown.svg?react'

import {Link, Outlet} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../contexts/user.context.jsx";
import {signOutUser} from "../../utils/firebase/firebase.util.js";

const Navigation = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser()
    setCurrentUser(null)
  }

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
            ) : (
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
            )
          }

        </div>
      </div>

      <Outlet/>
    </>
  )
}

export {Navigation}