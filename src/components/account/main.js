import React, { Component } from "react";
import { connect } from "react-redux";
import { checkSignin } from "./checkSignin";
import { renderInput } from "../user/inputForm";
import { reduxForm, Field } from "redux-form";
import CartItem from "./cartitem";
import "./account.css";
import { checkOut } from "../actions/cartActions";

export class Accountmain extends Component {
  constructor() {
    super();
    checkSignin();
  }

  state = {
    userName: "",
  };

  submitForm = async (formValues) => {
    const token = JSON.parse(localStorage.getItem("Bear-token"));
    const orderItems = this.props.cart.map((item) => {
      let productId = item.product_id;
      let quantity = item.amount;
      let price = item.price;
      let profileitems = item.profiles.map((list) => list.id);
      return { productId, quantity, price, profileitems };
    });
    const subValues = {
      userid: parseInt(JSON.parse(localStorage.getItem("Bear-user")).pk),
      orderItems,
    };
    // console.log('submit ===============>>>', subValues);
    this.props.checkOut(subValues, token);
  };

  render() {
    const {
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
      submitSucceded,
    } = this.props;

    const display =
      this.props.cart.length > 0 ? (
        <div>
          <form
            className="form-signin"
            onSubmit={handleSubmit(this.submitForm)}
          >
            <div className="container mt-5">
              <div style={{ marginTop: "50px" }}>
                <h3>Checkout</h3>
              </div>
              <hr />

              <div className="row my-2 text-capitalize text-center align-items-top mt-3">
                <div className="col-11 mx-auto col-lg-5">
                  <div className="user-info">
                    <Field
                      name="firstName"
                      type="text"
                      label="First Name"
                      component={renderInput}
                    ></Field>

                    <Field
                      name="lastName"
                      type="text"
                      label="Last Name"
                      component={renderInput}
                    ></Field>

                    <Field
                      name="address1"
                      type="text"
                      label="Address"
                      component={renderInput}
                    ></Field>

                    <Field
                      name="city"
                      type="text"
                      label="city"
                      component={renderInput}
                    ></Field>
                    <Field
                      name="country"
                      type="text"
                      label="Country"
                      component={renderInput}
                    ></Field>
                  </div>
                </div>

                <div className="col-10 mx-auto col-lg-5">
                  <CartItem />
                </div>
              </div>
              <div>
                <button className="btn btn-primary float-right">
                  Confirm Order
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center mt-5 p-5 font-weight-bolder">
          Empty Cart
        </div>
      );
    return display;
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = {
  checkOut,
};

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "firstName",
    "lastName",
    "address1",
    "city",
    "country",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const formWrapped = reduxForm({
  form: "userForm",
  validate,
})(Accountmain);

export default connect(mapStateToProps, mapDispatchToProps)(formWrapped);
