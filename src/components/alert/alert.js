import React, { Component } from "react";
import { withAlert } from "react-alert";
import { getErrors } from "../actions/errorActions";
import { connect } from "react-redux";

class Alert extends Component {
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg) alert.error(error.msg);
      //   if (error.msg.email) alert.error(error.msg.email.join());
    }

    if (message !== prevProps.message) {
      if (message.loginOK) alert.success(message.loginOK);
      if (message.registerOK) alert.success(message.registerOK);
      if (message.invoidToken) alert.success(message.invoidToken);
      if (message.addCategory) alert.success(message.addCategory);
      if (message.addPic) alert.success(message.addPic);
      if (message.addProduct) alert.success(message.addProduct);
    }
  }

  render() {
    return <div></div>;
  }
}
const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

const mapDispatchToProps = {
  getErrors,
};

const Alertcombin = withAlert()(Alert);

export default connect(mapStateToProps, mapDispatchToProps)(Alertcombin);
