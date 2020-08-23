import React, { Component } from "react";
import "./login.css";
import request from "../api/request";
import history from "../history";
import Alert from "../alert/alert";
import { getErrors } from "../actions/errorActions";
import { getMessage, createMessage } from "../actions/messageActions";
import { connect } from "react-redux";
import { renderInput } from "./inputForm";
import { reduxForm, Field } from "redux-form";

class RegisterUser extends Component {
  submitForm = async (formValues) => {
    formValues["verified"] = 2;
    try {
      let res = await request.post("api/v1/user/create", formValues);
      if (res.data.code === 0) {
        this.props.createMessage({ registerOK: "Register in successful" });
        history.push("/login");
      } else {
        const errors = {
          msg: res.data.msg,
          status: 401,
        };
        this.props.getErrors(errors);
      }
    } catch (e) {
      const errors = {
        msg: e.response.data.msg,
        status: e.response.data.code,
      };
      this.props.getErrors(errors);
    }
  };

  render() {
    const {
      // error,
      handleSubmit,
      // pristine,
      // reset,
      // submitting,
      // invalid,
      // submitSucceded,
    } = this.props;

    return (
      <div className="loginBox">
        <Alert />
        <div className="box">
          <h2>Register</h2>
          <form
            className="form-signin"
            onSubmit={handleSubmit(this.submitForm)}
          >
            <Field
              name="userName"
              type="text"
              label="User Name"
              component={renderInput}
            ></Field>
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
              name="email"
              type="text"
              label="Email"
              component={renderInput}
            ></Field>

            <Field
              name="password"
              type="password"
              label="Password"
              component={renderInput}
            ></Field>
            <Field
              name="rpassword"
              type="password"
              label="Confirm Password"
              component={renderInput}
            ></Field>

            <input type="submit" name="" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getErrors,
  getMessage,
  createMessage,
};

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "userName",
    "firstName",
    "lastName",
    "email",
    "password",
    "rpassword",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.password !== values.rpassword) {
    errors.rpassword = "Not match";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "userForm",
  validate,
})(RegisterUser);

export default connect(null, mapDispatchToProps)(formWrapped);
