import React, { Component } from "react";
import { connect } from "react-redux";

export class Infostatus extends Component {
  render() {
    if (this.props?.order?.user) {
      const {
        userName,
        firstName,
        lastName,
        address1,
        city,
        country,
        email,
        zipcode,
      } = this.props?.order?.user;

      const displayList = [
        "User Name",
        "First Name",
        "Last Name",
        "Email",
        "Address",
        "City",
        "Country",
        "Post Code",
      ];
      const displayValue = [
        userName,
        firstName,
        lastName,
        email,
        address1,
        city,
        country,
        zipcode,
      ];
      return (
        <div className="container">
          <div className="col">
            {displayList.map((item, index) => (
              <div key={index} className="row py-2 p-2">
                <span className="col-11 mx-auto col-lg-5 font-weight-bolder text-lg-right ">
                  {item}:
                </span>
                <span className="col-11 mx-auto col-lg-5 text-lg-left">
                  {displayValue[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <div className="container m-5 text-center">Loading</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  order: state.order.order,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Infostatus);
