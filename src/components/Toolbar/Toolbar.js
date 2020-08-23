import React, { useState, useEffect } from "react";
import "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle";
import { Link } from "react-router-dom";
import ProductItem from "./productItem";
import { connect } from "react-redux";
import { getCart, showCart } from "../actions/cartActions";
import { getOrders } from "../actions/orderActions";
import CartItem from "./cartItem";

const Toolbar = (props) => {
  const [showaccount, setShowaccount] = useState(false);
  const [showproducts, setShowproducts] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Bear-user")) props.getOrders();
  }, [showaccount]);

  const singOutfuc = () => {
    localStorage.removeItem("Bear-token");
    localStorage.removeItem("Bear-user");
    window.location.href = "/account";
  };

  const UserAccount = () => {
    const userInfo = JSON.parse(localStorage.getItem("Bear-user"));

    if (userInfo) {
      return (
        <div
          className="dropdown-content"
          onMouseLeave={() => setShowaccount(!showaccount)}
        >
          <div className="list-group">
            <div className="list-group-item btn-outline-secondary">
              Hi: {userInfo.fields.userName}
            </div>
            <Link to="/account/success">
              <div className="list-group-item btn-outline-secondary">
                Orders: {props.orders.length}
              </div>
            </Link>
            <div
              className="list-group-item btn-outline-secondary"
              onClick={singOutfuc}
              style={{ cursor: "pointer" }}
            >
              Logout
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="dropdown-content"
          onMouseLeave={() => setShowaccount(!showaccount)}
        >
          <div className="list-group">
            <Link to="/login">
              <div
                className="list-group-item btn-outline-secondary"
                style={{ cursor: "pointer" }}
              >
                Login
              </div>
            </Link>
          </div>
        </div>
      );
    }
  };

  const handleProduct = () => {
    setShowproducts(true);
    setShowaccount(false);
    props.showCart(false);
  };

  const handleAccount = () => {
    setShowproducts(false);
    setShowaccount(true);
    props.showCart(false);
  };

  const handleCart = () => {
    props.showCart(true);
    setShowproducts(false);
    setShowaccount(false);
  };

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggle click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <a href="/">Simple Code</a>
        </div>
        <div className="spacer"></div>
        <div className="toolbar_navigation-items">
          <ul>
            <li onMouseEnter={() => handleProduct()}>
              <Link to="/">Products</Link>
            </li>
            <li onMouseEnter={() => handleAccount()}>
              <Link to="/account">My Account</Link>
            </li>

            <li onMouseEnter={() => handleCart()}>
              <Link to="/cart">
                Cart {props.cart.cart.length > 0 && props.cart.cart.length}{" "}
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
          </ul>
          {showaccount && <UserAccount />}
          {showproducts && <ProductItem setShowproducts={setShowproducts} />}
          {props.cart.showCart && <CartItem />}
        </div>
      </nav>
    </header>
  );
};

// export default Toolbar;
const mapStateToProps = (state) => ({
  cart: state.cart,
  orders: state.order.orders,
});

const mapDispatchToProps = {
  getCart,
  showCart,
  getOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
