import React, { Component } from "react";
import Infopic from "./infopic";
import "./shopping.css";
import Profile from "./profile";
import Footerbar from "./footerbar";
import { connect } from "react-redux";
import { getProduct } from "../actions/productActions";

export class Productinfo extends Component {
  state = {
    qty: 1,
    addCart: false,
  };

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  backTo = () => {
    window.history.go(-1);
  };

  render() {
    const {
      name,
      description,
      price,
      profileitem,
      medias,
    } = this.props.product;
    // const totalAddPrice = this.state.addPrice.reduce(
    //   (total, item) => total + parseFloat(item.list.value),
    //   0
    // );
    const totalAddPrice = 0;
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
                    <Profile item={item} key={index} index={index} />
                  ))}
              </div>
              <div>
                <button
                  className="btn btn-warning btn-block"
                  onClick={() => this.backTo()}
                >
                  Back
                </button>
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
  return {
    product: state.product.product,
    profile: state.product.profile,
  };
};

const mapDispatchToProps = {
  getProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Productinfo);
