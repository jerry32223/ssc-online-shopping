import React, { Component } from "react";
import { connect } from "react-redux";
import { categoryProducts, cateSearchProducts } from "../actions/productActions";
import { Showitems } from "./showitems";

export class CategoryProducts extends Component {
  componentDidMount() {
    this.props.categoryProducts(this.props.match.params.category);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.category !== this.props.match.params.category) this.props.categoryProducts(this.props.match.params.category);
  }

  searchP = (e) => {
    this.props.cateSearchProducts(e.target.value);
  };

  render() {
    console.log("this is for search", this.props.product);

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
    enableReinitialize: true,
  };
};

const mapDispatchToProps = {
  categoryProducts,
  cateSearchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts);
