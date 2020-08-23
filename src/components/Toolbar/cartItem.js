import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, showCart } from "../actions/cartActions";
import { Link } from "react-router-dom";

export class CartItem extends Component {
  // componentDidMount() {
  //     this.props.getCart()
  // }

  display =
    this.props.cart.cart.length > 0 ? (
      <div
        className="dropdown-content-cart"
        onMouseLeave={() => this.props.showCart(false)}
      >
        {this.props?.cart?.cart?.map((item, index) => (
          <div key={index}>
            <div className="row align-items-center">
              <div className="col-3">
                <img src={item.media} alt="img" width="50px" />
              </div>
              <div className="col-9 col">
                <div>{item.name}</div>
                <div className="text-right">${item.price * item.amount}</div>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <div className="text-center">
          <Link to="/cart">
            <button className="btn btn-sm btn-outline-warning mr-5">
              Cart
            </button>
          </Link>
          <Link to="/account">
            <button className="btn btn-sm btn-outline-primary">
              Check Out
            </button>
          </Link>
        </div>
      </div>
    ) : (
      <div
        className="dropdown-content-cart"
        style={{ textAlign: "center" }}
        onMouseLeave={() => this.props.showCart(false)}
      >
        Empty Cart
      </div>
    );

  render() {
    return this.display;
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  getCart,
  showCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
