import React, { useState } from "react"
import "./Header.css"
import SearchIcon from "@material-ui/icons/Search"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import { Link } from "react-router-dom"
import { useStateValue } from "./StateProvider"
import { auth } from "./firebase"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/Close"

function Header() {
  const [{ basket, user }] = useStateValue()
  const handleAuth = () => {
    if (user) {
      auth.signOut()
    }
  }

  const [open, setOpen] = useState(false)

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput" />
        {/* Logo */}
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user ? "/login" : "/"}>
          <div className="header__option" onClick={handleAuth}>
            <span className="header__optionLineOne">
              Hello {user ? user.displayName.split(" ")[0] : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to={user ? "/orders" : "/login"}>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon style={{ fontSize: "2rem" }} />
            <span className="header__optionLineTwo header__basketCount">
              {parseInt(
                basket?.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.quantity,
                  0
                )
              )}
            </span>
          </div>
        </Link>
      </div>
      <div className="header__menuIcon">
        <MenuIcon
          style={{
            display: open ? "none" : "block",
            color: "white",
            margin: "5px",
            marginRight: "10px",
            fontSize: "2rem",
          }}
          onClick={() => setOpen(!open)}
        />
      </div>

      <CloseIcon
        style={{
          zIndex: 2,
          display: open ? "block" : "none",
          color: "white",
          margin: "5px",
          marginRight: "10px",
          fontSize: "2rem",
        }}
        onClick={() => setOpen(!open)}
      />
      <div className="header__nav2" style={{ display: open ? "flex" : "none" }}>
        <Link to={!user ? "/login" : "/"}>
          <div
            onClick={() => {
              setOpen(!open)
              handleAuth()
            }}
            className="header__option header__option2"
          >
            <span className="header__optionLineOne header__optionLineOne2">
              Hello {user ? user.displayName.split(" ")[0] : "Guest"}
            </span>
            <span className="header__optionLineTwo header__optionLineTwo2">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to={user ? "/orders" : "/login"}>
          <div
            onClick={() => setOpen(!open)}
            className="header__option header__option2"
          >
            <span className="header__optionLineOne header__optionLineOne2">
              Returns
            </span>
            <span className="header__optionLineTwo header__optionLineTwo2">
              & Orders
            </span>
          </div>
        </Link>
        <div className="header__option header__option2">
          <span className="header__optionLineOne2">Your</span>
          <span className="header__optionLineTwo2">Prime</span>
        </div>

        <Link to="/checkout">
          <div
            onClick={() => setOpen(!open)}
            className="header__optionBasket header__optionBasket2"
          >
            <ShoppingBasketIcon style={{ fontSize: "2rem" }} />
            <span className="header__optionLineTwo header__optionLineTwo2  header__basketCount">
              {parseInt(
                basket?.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.quantity,
                  0
                )
              )}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
