import React, { Component } from "react";
import { Infopicsmall } from "./infopicsmall";

export default class Infopic extends Component {
  state = {
    picNo: 0,
  };

  handlePic = (id) => {
    this.setState({
      picNo: id,
    });
  };

  render() {
    // console.log(this.props.piclink);

    return (
      <div className="mt-5">
        <div>
          <img
            src={this.props?.piclink[this.state.picNo]}
            alt="bigpic"
            className="card-img-top"
            width="200px"
            id="card-img-top-1"
          />
        </div>
        <div className="row">
          {this.props?.piclink?.map((item, index) => (
            <Infopicsmall
              key={index}
              item={item}
              handlePic={this.handlePic}
              index={index}
              picNo={this.state.picNo}
            />
          ))}
        </div>
      </div>
    );
  }
}
