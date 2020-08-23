import React from "react";
import { Link } from "react-router-dom";

export const Showitems = ({ item }) => {
  const { medias, name, price, id } = item;
  return (
    <div className="card m-3" style={{ width: "20rem" }} id="item-product">
      <Link to={`/productinfo/${id}`}>
        <img src={medias[0]} className="card-img-top" alt="tvpic" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <p className="card-text">
          <strong className="float-right">${price}</strong>
          {/* <Link to={`productinfo/${id}`}>
            <button className="btn btn-sm btn-success float-right">Info</button>
          </Link> */}
        </p>
      </div>
    </div>
  );
};
