import React, { Component } from "react";
import { connect } from "react-redux";
import { getErrors } from "../actions/errorActions";
import { addCart, getCart, showCart } from "../actions/cartActions";

import Alert from "../alert/alert";

export class Footerbar extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart)
      localStorage.setItem("Bear-cart", JSON.stringify(this.props.cart));
  }

  state = {
    amount: 1,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.amount <= 0) {
      const errors = {
        msg: "Must be greater than 0",
        status: 400,
      };
      this.props.getErrors(errors);
      return false;
    }
    const { id, name, price, medias } = this.props.product;
    const { profile } = this.props;
    const profileTotal = this.props.profile.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
    let num_profile = "";
    profile.map((item) => (num_profile += String(item.id)));
    const sku = `${String(id)}${num_profile}`;
    const value = {
      product_id: id,
      name,
      price: parseFloat(price) + parseFloat(profileTotal),
      profiles: this.props.profile,
      sku,
      amount: this.state.amount,
      media: medias[0],
    };

    this.props.addCart(value);

    setTimeout(this.handleShowCart, 3000);
  };

  handleShowCart = () => {
    this.props.showCart(false);
  };

  handleChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };
  render() {
    const { product, profile } = this.props;
    const profileTotal = profile.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );

    return (
      <div>
        <Alert />
        <div className="Product-footer">
          <form onSubmit={this.handleSubmit}>
            <div className="row m-3">
              <div className="col-3 ">
                <div className="float-right">
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={this.state.amount}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
              </div>
              <div className="col-4">
                <h2 className="card-title">
                  ${parseFloat(product.price) + parseFloat(profileTotal)}
                </h2>
              </div>

              <div className="col-5">
                <button className="btn btn-primary" type="submit">
                  Add to Cart
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
  profile: state.product.profile,
  cart: state.cart.cart,
  enableReinitialize: true,
});

const mapDispatchToProps = {
  getErrors,
  addCart,
  getCart,
  showCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footerbar);
