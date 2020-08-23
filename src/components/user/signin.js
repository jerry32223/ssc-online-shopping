import React, { Component } from "react";
import "./login.css";
import request from "../api/request";
import history from "../history";
import Alert from "../alert/alert";
import { getErrors } from "../actions/errorActions";
import { getMessage, createMessage } from "../actions/messageActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SinginUser extends Component {
  state = {
    userName: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userName: this.state.userName,
      password: this.state.password,
    };

    try {
      let res = await request.post("api/v1/user/auth/login", user);

      localStorage.setItem("Bear-token", JSON.stringify(res.data.data.token));
      localStorage.setItem("Bear-user", JSON.stringify(res.data.data.user));
      this.props.createMessage({ loginOK: "Login in successful" });
      history.push("/account");
    } catch (e) {
      const errors = {
        msg: e.response.data.msg,
        status: e.response.data.code,
      };
      this.props.getErrors(errors);
    }
    //     console.log(res.data.token);
    //     this.props.cookies.set("admin-token", res.data.token);
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="loginBox">
        <Alert />
        <div className="box">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                name="userName"
                required
                value={username}
                onChange={(event) => this.handleChange(event)}
                autoFocus
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(event) => this.handleChange(event)}
              />
              <label htmlFor="password">Password</label>
            </div>
            <input type="submit" name="" value="Submit" />
          </form>
          <div className="text-center text-white mt-5">
            <Link to="/register">Register</Link>
          </div>
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

export default connect(null, mapDispatchToProps)(SinginUser);
