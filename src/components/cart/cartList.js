import React, { Component } from "react";
import { connect } from "react-redux";
import { decrease, increase, remove } from "../actions/cartActions";
import Showdetail from "./showdetail";

export class CartList extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.cart.cart !== this.props.cart.cart)
      localStorage.setItem("Bear-cart", JSON.stringify(this.props.cart.cart));
  }

  cartIncrease = (id) => {
    this.props.increase(id);
  };

  cartDecrease = (id, amount) => {
    this.props.decrease(id, amount);
  };

  cartRemove = (id) => {
    this.props.remove(id);
  };

  render() {
    const cartDisplay = this.props?.cart?.cart?.map((item, index) => {
      const { product_id, name, media, sku, price, amount, profiles } = item;
      const total = price * amount;

      return (
        <div key={index}>
          <div className="row my-2 text-capitalize text-center align-items-top mt-3">
            <div className="col-10 mx-auto col-lg-2">
              <img src={media} alt="pic" className="img-fluid" />
            </div>
            <div className="col-10 mx-auto col-lg-5">
              <div className=" font-weight-bolder">{name}</div>
              <Showdetail product_id={product_id} profiles={profiles} />
            </div>
            {/* <div className="col-10 mx-auto col-lg-2">${price}</div> */}
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
              <div className="d-flex justify-content-center">
                <div>
                  {/* <span
                                        className="btn btn-black"
                                        onClick={() => this.cartDecrease(sku, amount)}
                                    >
                                        -
                  </span> */}
                  <i
                    className="fas fa-minus"
                    onClick={() => this.cartDecrease(sku, amount)}
                    style={{ cursor: "pointer", marginRight: "5px" }}
                  ></i>
                  <span className="btn btn-black mx-1 font-weight-bolder">
                    {amount}
                  </span>
                  {/* <span
                                        className="btn btn-black mx-1"
                                        onClick={() => this.cartIncrease(sku)}
                                    >
                                        +
                  </span> */}
                  <i
                    className="fas fa-plus"
                    onClick={() => this.cartIncrease(sku)}
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="col-10 mx-auto col-lg-3">
              <div>
                <strong>${total}</strong>
              </div>
              <div>
                <span
                  onClick={() => this.cartRemove(sku)}
                  style={{
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#0066cc",
                  }}
                >
                  Remove
                </span>
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
    });
    return <div>{cartDisplay}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  decrease,
  increase,
  remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
