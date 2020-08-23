import React, { Component } from "react";
import { connect } from "react-redux";
import SinginUser from "./signin";

export class Login extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <SinginUser />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
