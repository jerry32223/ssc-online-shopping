import React from "react";
import { Link } from "react-router-dom";

export default function Default() {
  return (
    <div className="text-center">
      Click
      <Link to="/"> Go to Homepage</Link>
    </div>
  );
}
