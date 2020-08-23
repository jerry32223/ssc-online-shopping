import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart } from "../actions/cartActions";
import CartList from "./cartList";
import { Link } from "react-router-dom";

export class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  clearCart = () => {
    localStorage.removeItem("Bear-cart");
  };
  render() {
    const display =
      this.props.cart.cart.length === 0 ? (
        <div className="text-center p-5"> Empty Cart {this.clearCart()}</div>
      ) : (
        <div>
          {/* <CartHeader /> */}
          <CartList />
        </div>
      );

    let { total } = this.props.cart.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = amount * price;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      {
        total: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return (
      <div className="container mt-5 mb-5">
        <div className="crad-header"></div>
        <div className="row justify-content-center mt-5">{display}</div>
        {this.props.cart.cart.length > 0 && (
          <div>
            <div className="font-weight-bolder mt-3 mb-3 float-md-right">
              Total: ${total}
            </div>
            <div className="col-10 mx-auto col-lg-12 mt-5 mb-5">
              <Link to="/account">
                <button className="btn btn-primary float-right mt-5">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  getCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
