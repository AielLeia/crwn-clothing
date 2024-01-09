import "./navigation.styles.scss"

import CrwnLogo from '../../assets/crown.svg?react'

import {Link, Outlet} from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
        </div>
      </div>

      <Outlet/>
    </>
  )
}

export {Navigation}