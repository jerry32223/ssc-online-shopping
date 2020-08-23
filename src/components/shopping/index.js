import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts, searchProducts } from "../actions/productActions";
import { Showitems } from "./showitems";

export class ShoppingIndex extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  searchP = (e) => {
    this.props.searchProducts(e.target.value);
  };

  render() {
    const productDisplay = this.props.product.map((item, index) => (
      <div key={index}>
        <Showitems item={item} />
      </div>
    ));
    return (
      <div style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="container">
            <div className="input-group mb-3 mt-5">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Search
                </span>
              </div>
              <input
                type="text"
                id="searchInput"
                name="searchP"
                className="form-control"
                placeholder="Search here..."
                aria-label="SearchProducts"
                onKeyUp={(e) => this.searchP(e)}
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="row mt-3 mb-3">{productDisplay}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product.products,
  };
};

const mapDispatchToProps = {
  getProducts,
  searchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingIndex);
