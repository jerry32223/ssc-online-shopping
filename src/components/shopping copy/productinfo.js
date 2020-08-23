import React, { Component } from "react";
import Infopic from "./infopic";
import { Link } from "react-router-dom";
import "./shopping.css";
import Profile from "./profile";
import Footerbar from "./footerbar";
import { connect } from "react-redux";
import { getProduct } from "../actions/productActions";

export class Productinfo extends Component {
  state = {
    productItem: {},
    qty: 1,
    addCart: false,
    addPrice: [],
  };

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  handleAddPrice = (id, listid, value) => {
    let typeCart = 0;
    this.state.addPrice.find((item) =>
      parseInt(item.id) === parseInt(id) ? (typeCart = 1) : (typeCart = 0)
    );
    if (typeCart === 1) {
      this.setState({
        addPrice: this.state.addPrice.map((item) =>
          item.id === id
            ? { ...item, list: { ...item.list, value: value } }
            : item
        ),
      });
    } else {
      this.setState({
        addPrice: [...this.state.addPrice, { id, list: { listid, value } }],
      });
    }
  };

  render() {
    // console.log(this.state.addPrice);
    const {
      name,
      description,
      price,
      profileitem,
      medias,
    } = this.props.product;
    const totalAddPrice = this.state.addPrice.reduce(
      (total, item) => total + parseFloat(item.list.value),
      0
    );
    const totalmonety = parseFloat(price) + parseFloat(totalAddPrice);
    return (
      <div>
        <div className="container row mt-5">
          <div className="col-sm-6 mb-3" id="picarea">
            <div className="pic-sticky">
              {medias && <Infopic piclink={medias} />}
            </div>
          </div>
          <div className=" col-sm-6 mt-3">
            <div className="card">
              <h5 className="card-header">Information</h5>
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>

                {profileitem &&
                  profileitem.map((item, index) => (
                    <Profile
                      item={item}
                      key={index}
                      index={index}
                      handleAddPrice={this.handleAddPrice}
                    />
                  ))}
              </div>
              <div>
                <Link to="/">
                  <button className="btn btn-warning btn-block">Back</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footerbar
            totalmoney={totalmonety}
            qty={this.state.qty}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <div className="footer-back">.</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("this is from state", state);

  return {
    product: state.product.product,
  };
};

const mapDispatchToProps = {
  getProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Productinfo);
