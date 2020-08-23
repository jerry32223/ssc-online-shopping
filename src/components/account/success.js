import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { getOrders } from "../actions/orderActions";

export class Success extends Component {
  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    return (
      <div className="container mt-5">
        <div style={{ marginTop: "50px" }}>
          <h3>Order List</h3>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>Order No</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.user.userName}</td>
                  <td>{moment(item.added).format("YY-MM-DD HH:mm")}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/account/order/${item.id}`}>
                      <button className="btn btn-sm btn-outline-info">
                        Info
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
});

const mapDispatchToProps = {
  getOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
