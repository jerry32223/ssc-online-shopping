import React, { Component } from "react";
import { connect } from "react-redux";
import request from "../api/request";
import "./Toolbar.css";
import { Link } from "react-router-dom";

export class ProductItem extends Component {
  state = {
    productItem: [],
  };
  async componentDidMount() {
    try {
      let res = await request.get("api/v1/product/category");
      this.setState({
        productItem: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div
        className="dropdown-content-product"
        onMouseLeave={() => this.props.setShowproducts(false)}
      >
        <div className="list-group">
          {this.state.productItem.map((item, index) => (
            <Link key={index} to={`/category/${item.pk}`}>
              <div
                className="list-group-item btn-outline-secondary"
                style={{ cursor: "pointer" }}
              >
                {item.fields.friendlyName}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
