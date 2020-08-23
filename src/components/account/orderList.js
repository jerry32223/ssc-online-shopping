import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrder } from "../actions/orderActions";
import Infoitem from "./infoitem";
import Infostatus from "./infostatus";

export class Orderlist extends Component {
    componentDidMount() {
        this.props.getOrder(this.props.match.params.id);
    }

    backTo = () => {
        window.history.go(-1);
    };
    render() {
        return (
            <div className="container p-3">
                <div className="card border-secondary mb-3 mt-3">
                    <div className="card-header">Order Information</div>
                    <div className="card-body text-secondary">
                        <div className="row my-2 text-center align-items-top mt-3">
                            <div className="col-11 mx-auto col-lg-5">
                                <Infostatus />
                            </div>
                            <div className="col-11 mx-auto col-lg-5">
                                <Infoitem />

                            </div>
                        </div>
                        <div className="mt-3">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={() => this.backTo()}
                            >
                                Back
                  </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("this is from state ===========>>>", state);

    return {
        order: state.order.order,
    };
};

const mapDispatchToProps = {
    getOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orderlist);
