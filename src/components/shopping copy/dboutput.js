import React from "react";

function Dboutput() {
  const productItem = localStorage.getItem("Bear-product");
  return <div>{productItem}</div>;
}

export default Dboutput;
