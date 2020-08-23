import React, { Component } from "react";
import { connect } from "react-redux";
import { controlProfileItem } from "../actions/productActions";

export class Profileitem extends Component {
    render() {
        const { list } = this.props;

        const listProfile = this.props.profile.filter(
            (item) => item.item === list.profile
        )[0];

        const displayPrice = parseFloat(list.price) - parseFloat(listProfile.price);
        const liActive =
            list.id === listProfile.id
                ? "list-group-item btn-outline-secondary active"
                : "list-group-item btn-outline-secondary";

        return (
            <ul className="list-group m-3">
                <li
                    className={liActive}
                    onClick={() =>
                        this.props.controlProfileItem(
                            list.id,
                            list.profile,
                            list.name,
                            list.price
                        )
                    }
                    style={{ cursor: "pointer" }}
                >
                    <div className="row">
                        <div className="col-md-8">{list.name}</div>
                        <div className="col-md-4 text-right">
                            {displayPrice !== 0 && `$${displayPrice}`}
                        </div>
                    </div>
                </li>
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.product.profile,
    };
};

const mapDispatchToProps = {
    controlProfileItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profileitem);
