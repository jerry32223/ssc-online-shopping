import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, showCart } from "../actions/cartActions";
import "./account.css";

export class CartItem extends Component {
  values = this.props.cart.cart.reduce((a, c) => a + c.amount * c.price, 0);

  display =
    this.props.cart.cart.length > 0 ? (
      <div className="cart-info">
        {this.props?.cart?.cart?.map((item, index) => (
          <div key={index}>
            <div className="row align-items-center">
              <div className="col-10 mx-auto col-lg-3">
                <img src={item.media} alt="img" className="img-fluid" />
              </div>
              <div className="col-10 mx-auto col-lg-9">
                <div>{item.name}</div>
                <div className="show-info">
                  {item.profiles.map((a, profileIndex) => (
                    <span key={profileIndex}>{a.name}</span>
                  ))}
                </div>
                <div className="row justify-content-around">
                  <div>Amount: {item.amount}</div>
                  <div> ${item.price * item.amount}</div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <div className="text-right font-weight-bolder">
          Total: ${this.values}
        </div>
      </div>
    ) : (
      <div className="cart-info" style={{ textAlign: "center" }}>
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
