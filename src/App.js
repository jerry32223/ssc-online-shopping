import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./components/store";
import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import { Router, Route, Switch } from "react-router-dom";
import history from "./components/history";
import ShoopingIndex from "./components/shopping";
import Default from "./components/default";
import Login from "./components/user/login";
import RegisterUser from "./components/user/register";
import Cart from "./components/cart/cart";
import Accountmain from "./components/account/main";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Productitem from "./components/shopping/productinfo";
import Dboutput from "./components/shopping/dboutput";
import Success from "./components/account/success";
import CategoryProducts from "./components/shopping/category";
import OrderList from "./components/account/orderList";

import "bootstrap/dist/css/bootstrap.min.css";

const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 5000,
  offset: "20px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

class App extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    // let sideDrawer
    let backdrop;

    if (this.state.sideDrawerOpen) {
      // sideDrawer = <SideDrawer />
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Router history={history}>
              <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
              <SideDrawer show={this.state.sideDrawerOpen} />
              {backdrop}
              <main>
                <div className="container mt-5">
                  <Switch>
                    <Route path="/" exact component={ShoopingIndex} />
                    <Route path="/account" exact component={Accountmain} />
                    <Route path="/productinfo/:id" component={Productitem} />
                    <Route path="/login" component={Login} />
                    <Route path="/account/order/:id" component={OrderList} />
                    <Route
                      path="/category/:category"
                      component={CategoryProducts}
                    />
                    <Route path="/account/success" component={Success} />
                    <Route path="/register" component={RegisterUser} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/dboutput" component={Dboutput} />
                    <Route component={Default} />
                  </Switch>
                </div>
              </main>
            </Router>
          </AlertProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
