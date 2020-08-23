import React, { Component } from "react";
import { connect } from "react-redux";

export class Infoitem extends Component {
  render() {
    const values = this.props?.order?.orderItems?.reduce(
      (a, c) => a + c.quantity * c.price,
      0
    );
    console.log(this.props.order);

    return (
      <div className="cart-info">
        {this.props?.order?.orderItems?.map((item, index) => (
          <div key={index}>
            <div className="row align-items-center">
              <div className="col-10 mx-auto col-lg-3">
                <img src={item.media} alt="img" className="img-fluid" />
              </div>
              <div className="col-10 mx-auto col-lg-9">
                <div>{item.product.name}</div>
                <div className="show-info">
                  {item.profileitems.map((a, profileIndex) => (
                    <span key={profileIndex}>{a.name}</span>
                  ))}
                </div>
                <div className="row justify-content-around">
                  <div>Amount: {item.quantity}</div>
                  <div> ${item.price * item.quantity}</div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <div className="text-right font-weight-bolder">Total: ${values}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order.order,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Infoitem);
