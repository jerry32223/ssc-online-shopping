import React from "react";
import "./login.css";

export const renderInput = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => (
  <div className="inputBox">
    <input className="form-control" type={type} {...input} />
    <label>
      {label}{" "}
      {touched && error && (
        <span className="text-danger" style={{ fontSize: "12px" }}>
          {error}
        </span>
      )}
    </label>
  </div>
);
