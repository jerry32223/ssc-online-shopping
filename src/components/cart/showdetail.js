import React, { useState } from "react";

const Showdetail = ({ product_id, profiles }) => {
  const [showdetail, setShowdetail] = useState(false);
  const arrowDirection = showdetail ? (
    <i className="fas fa-chevron-up"></i>
  ) : (
    <i className="fas fa-chevron-down"></i>
  );
  const showDetailInformation = showdetail
    ? profiles.map((item, index) => (
        <div key={index}>
          {item.item} {item.name}
        </div>
      ))
    : "";
  return (
    <div>
      <div className="font-weight-light font-smaller">
        <span
          onClick={() => setShowdetail(!showdetail)}
          style={{ cursor: "pointer" }}
        >
          Show Product Details {arrowDirection}
        </span>
      </div>
      <div>{showDetailInformation}</div>
    </div>
  );
};

export default Showdetail;
